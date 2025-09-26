import { DataSource } from 'typeorm';
import { User, UserRole } from '../users/user.entity';
import { Venue } from '../venues/venue.entity';
import { Experience, ExperienceType } from '../experiences/experience.entity';
import { Availability, AvailabilityStatus } from '../availability/availability.entity';

export async function seedDatabase(dataSource: DataSource) {
  console.log('Starting database seeding...');

  const userRepository = dataSource.getRepository(User);
  const venueRepository = dataSource.getRepository(Venue);
  const experienceRepository = dataSource.getRepository(Experience);
  const availabilityRepository = dataSource.getRepository(Availability);

  // Create a host user
  let host = await userRepository.findOne({ where: { email: 'host@example.com' } });
  if (!host) {
    host = userRepository.create({
      email: 'host@example.com',
      password: 'hashedpassword123',
      firstName: 'Maria',
      lastName: 'Rodriguez',
      role: UserRole.HOST,
      phone: '+1234567890',
    });
    await userRepository.save(host);
    console.log('Created host user');
  }

  // Create a regular user
  let user = await userRepository.findOne({ where: { email: 'user@example.com' } });
  if (!user) {
    user = userRepository.create({
      email: 'user@example.com',
      password: 'hashedpassword123',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.USER,
      phone: '+1234567891',
    });
    await userRepository.save(user);
    console.log('Created regular user');
  }

  // Create venues
  const venueData = [
    {
      name: 'Casa de Sabores',
      description: 'Authentic Mexican home cooking experience in a cozy family setting. Learn traditional recipes passed down through generations.',
      address: '123 Main Street',
      city: 'Barcelona',
      country: 'Spain',
      capacity: 12,
      images: ['/images/casa-de-sabores.jpg'],
      amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Dining Room'],
      cuisineTypes: ['Mexican', 'Traditional', 'Vegetarian Options'],
      hostId: host.id,
    },
    {
      name: 'Tokyo Night Kitchen',
      description: 'Experience the art of Japanese cuisine with hands-on sushi making and traditional cooking techniques.',
      address: '456 Elm Avenue',
      city: 'Tokyo',
      country: 'Japan',
      capacity: 8,
      images: ['/images/tokyo-night.jpg'],
      amenities: ['Traditional Tatami', 'Professional Kitchen', 'Sake Bar'],
      cuisineTypes: ['Japanese', 'Sushi', 'Traditional'],
      hostId: host.id,
    },
    {
      name: 'Tuscan Garden Table',
      description: 'Farm-to-table Italian dining experience in a beautiful garden setting with fresh ingredients.',
      address: '789 Oak Road',
      city: 'Florence',
      country: 'Italy',
      capacity: 16,
      images: ['/images/tuscan-garden.jpg'],
      amenities: ['Garden Dining', 'Wine Cellar', 'Organic Garden', 'Outdoor Kitchen'],
      cuisineTypes: ['Italian', 'Farm-to-Table', 'Organic'],
      hostId: host.id,
    },
  ];

  const venues: Venue[] = [];
  for (const venueInfo of venueData) {
    let venue = await venueRepository.findOne({ where: { name: venueInfo.name } });
    if (!venue) {
      venue = venueRepository.create(venueInfo);
      venue = await venueRepository.save(venue);
      console.log(`Created venue: ${venue.name}`);
    }
    venues.push(venue);
  }

  // Create experiences
  const experienceData = [
    {
      title: 'Traditional Mexican Cooking Class',
      description: 'Learn to make authentic tacos, salsas, and traditional Mexican desserts in this hands-on cooking class.',
      type: ExperienceType.COOKING_CLASS,
      basePrice: 85.00,
      duration: 180, // 3 hours
      minGuests: 2,
      maxGuests: 8,
      images: ['/images/mexican-cooking.jpg'],
      includedItems: ['All ingredients', 'Recipe cards', 'Welcome drink', 'Full meal'],
      requirements: ['No cooking experience required', 'Comfortable clothing recommended'],
      venueId: venues[0].id,
    },
    {
      title: 'Mexican Family Dinner Experience',
      description: 'Join our family for an authentic Mexican dinner with traditional dishes and stories.',
      type: ExperienceType.DINING,
      basePrice: 65.00,
      duration: 120,
      minGuests: 1,
      maxGuests: 6,
      images: ['/images/family-dinner.jpg'],
      includedItems: ['3-course meal', 'Welcome drink', 'Traditional music'],
      requirements: ['Please inform of dietary restrictions'],
      venueId: venues[0].id,
    },
    {
      title: 'Sushi Making Workshop',
      description: 'Master the art of sushi making with our experienced chef in an authentic Japanese setting.',
      type: ExperienceType.COOKING_CLASS,
      basePrice: 120.00,
      duration: 150,
      minGuests: 2,
      maxGuests: 6,
      images: ['/images/sushi-class.jpg'],
      includedItems: ['Fresh fish', 'All tools', 'Tea ceremony', 'Take-home sushi'],
      requirements: ['Basic knife skills helpful but not required'],
      venueId: venues[1].id,
    },
    {
      title: 'Tuscan Wine & Dine',
      description: 'Enjoy a multi-course Tuscan meal paired with local wines in our beautiful garden.',
      type: ExperienceType.WINE_TASTING,
      basePrice: 95.00,
      duration: 180,
      minGuests: 2,
      maxGuests: 12,
      images: ['/images/wine-dinner.jpg'],
      includedItems: ['4-course meal', '4 wine pairings', 'Garden tour', 'Recipe book'],
      requirements: ['Must be 18+ for wine', 'Vegetarian options available'],
      venueId: venues[2].id,
    },
  ];

  const experiences: Experience[] = [];
  for (const expInfo of experienceData) {
    let experience = await experienceRepository.findOne({ where: { title: expInfo.title } });
    if (!experience) {
      experience = experienceRepository.create(expInfo);
      experience = await experienceRepository.save(experience);
      console.log(`Created experience: ${experience.title}`);
    }
    experiences.push(experience);
  }

  // Create availability for the next 30 days
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip Mondays (venues closed)
    if (date.getDay() === 1) continue;

    for (const experience of experiences) {
      const timeSlots = [
        { start: '11:00', end: '14:00' },
        { start: '18:00', end: '21:00' },
      ];

      for (const slot of timeSlots) {
        const existing = await availabilityRepository.findOne({
          where: {
            experienceId: experience.id,
            date: date,
            startTime: slot.start,
          },
        });

        if (!existing) {
          const availability = availabilityRepository.create({
            experienceId: experience.id,
            date: date,
            startTime: slot.start,
            endTime: slot.end,
            maxSlots: Math.floor(experience.maxGuests / 2), // 2 people per slot
            bookedSlots: 0,
            status: AvailabilityStatus.AVAILABLE,
          });
          await availabilityRepository.save(availability);
        }
      }
    }
  }

  console.log('Database seeding completed!');
}