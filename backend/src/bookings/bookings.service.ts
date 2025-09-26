import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus, PaymentStatus } from './booking.entity';
import { User } from '../users/user.entity';
import { Experience } from '../experiences/experience.entity';
import { AvailabilityService } from '../availability/availability.service';
import { CreateBookingDto, UpdateBookingDto, BookingQueryDto } from './dto/booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
    private availabilityService: AvailabilityService,
  ) {}

  async create(userId: string, createBookingDto: CreateBookingDto): Promise<Booking> {
    // Verify user exists
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify experience exists
    const experience = await this.experiencesRepository.findOne({
      where: { id: createBookingDto.experienceId },
    });
    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    // Check availability and reserve slots
    const isAvailable = await this.availabilityService.checkAvailability(
      createBookingDto.availabilityId,
      createBookingDto.guestCount,
    );

    if (!isAvailable) {
      throw new BadRequestException('Selected time slot is not available or fully booked');
    }

    // Validate guest count
    if (createBookingDto.guestCount < experience.minGuests || 
        createBookingDto.guestCount > experience.maxGuests) {
      throw new BadRequestException(
        `Guest count must be between ${experience.minGuests} and ${experience.maxGuests}`,
      );
    }

    // Get availability details for pricing
    const availability = await this.availabilityService.findOne(createBookingDto.availabilityId);
    const pricePerGuest = availability.priceOverride || experience.basePrice;
    
    // Calculate total price
    const baseTotal = pricePerGuest * createBookingDto.guestCount;
    const serviceFee = baseTotal * 0.05; // 5% service fee
    const taxes = baseTotal * 0.08; // 8% taxes
    const totalPrice = baseTotal + serviceFee + taxes;

    // Create booking
    const booking = this.bookingsRepository.create({
      ...createBookingDto,
      userId,
      totalPrice: Number(totalPrice.toFixed(2)),
      serviceFee: Number(serviceFee.toFixed(2)),
      taxes: Number(taxes.toFixed(2)),
      status: BookingStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
    });

    const savedBooking = await this.bookingsRepository.save(booking);

    // Reserve the slots
    await this.availabilityService.reserveSlots(
      createBookingDto.availabilityId,
      createBookingDto.guestCount,
    );

    return await this.findOne(savedBooking.id);
  }

  async findAll(queryDto: BookingQueryDto = {}): Promise<Booking[]> {
    const queryBuilder = this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.experience', 'experience')
      .leftJoinAndSelect('experience.venue', 'venue')
      .leftJoinAndSelect('booking.availability', 'availability');

    if (queryDto.status) {
      queryBuilder.andWhere('booking.status = :status', { status: queryDto.status });
    }

    if (queryDto.paymentStatus) {
      queryBuilder.andWhere('booking.paymentStatus = :paymentStatus', { 
        paymentStatus: queryDto.paymentStatus 
      });
    }

    if (queryDto.userId) {
      queryBuilder.andWhere('booking.userId = :userId', { userId: queryDto.userId });
    }

    if (queryDto.experienceId) {
      queryBuilder.andWhere('booking.experienceId = :experienceId', { 
        experienceId: queryDto.experienceId 
      });
    }

    if (queryDto.startDate && queryDto.endDate) {
      queryBuilder.andWhere('availability.date BETWEEN :startDate AND :endDate', {
        startDate: new Date(queryDto.startDate),
        endDate: new Date(queryDto.endDate),
      });
    }

    return await queryBuilder
      .orderBy('booking.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      relations: [
        'user',
        'experience',
        'experience.venue',
        'experience.venue.host',
        'availability'
      ],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async findByUser(userId: string): Promise<Booking[]> {
    return await this.bookingsRepository.find({
      where: { userId },
      relations: [
        'experience',
        'experience.venue',
        'availability'
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async findByHost(hostId: string): Promise<Booking[]> {
    return await this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.experience', 'experience')
      .leftJoinAndSelect('experience.venue', 'venue')
      .leftJoinAndSelect('booking.availability', 'availability')
      .where('venue.hostId = :hostId', { hostId })
      .orderBy('booking.createdAt', 'DESC')
      .getMany();
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.findOne(id);
    
    // Handle status changes that affect availability
    if (updateBookingDto.status && updateBookingDto.status !== booking.status) {
      if (updateBookingDto.status === BookingStatus.CANCELLED) {
        // Release the reserved slots
        await this.availabilityService.releaseSlots(
          booking.availabilityId,
          booking.guestCount,
        );
        booking.cancelledAt = new Date();
      } else if (updateBookingDto.status === BookingStatus.CONFIRMED) {
        booking.confirmedAt = new Date();
      }
    }

    Object.assign(booking, updateBookingDto);
    
    return await this.bookingsRepository.save(booking);
  }

  async cancel(id: string, cancellationReason?: string): Promise<Booking> {
    const booking = await this.findOne(id);

    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking is already cancelled');
    }

    if (booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel a completed booking');
    }

    // Release the reserved slots
    await this.availabilityService.releaseSlots(
      booking.availabilityId,
      booking.guestCount,
    );

    booking.status = BookingStatus.CANCELLED;
    booking.cancelledAt = new Date();
    if (cancellationReason) {
      booking.cancellationReason = cancellationReason;
    }

    return await this.bookingsRepository.save(booking);
  }

  async confirm(id: string): Promise<Booking> {
    const booking = await this.findOne(id);

    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Only pending bookings can be confirmed');
    }

    booking.status = BookingStatus.CONFIRMED;
    booking.confirmedAt = new Date();

    return await this.bookingsRepository.save(booking);
  }

  async markAsCompleted(id: string): Promise<Booking> {
    const booking = await this.findOne(id);

    if (booking.status !== BookingStatus.CONFIRMED) {
      throw new BadRequestException('Only confirmed bookings can be marked as completed');
    }

    booking.status = BookingStatus.COMPLETED;

    return await this.bookingsRepository.save(booking);
  }

  async getBookingStats(hostId?: string): Promise<any> {
    const queryBuilder = this.bookingsRepository
      .createQueryBuilder('booking')
      .leftJoin('booking.experience', 'experience')
      .leftJoin('experience.venue', 'venue');

    if (hostId) {
      queryBuilder.where('venue.hostId = :hostId', { hostId });
    }

    const totalBookings = await queryBuilder.getCount();

    const statusCounts = await queryBuilder
      .select('booking.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('booking.status')
      .getRawMany();

    const totalRevenue = await queryBuilder
      .select('SUM(booking.totalPrice)', 'total')
      .where('booking.paymentStatus = :paymentStatus', { paymentStatus: PaymentStatus.PAID })
      .getRawOne();

    return {
      totalBookings,
      statusCounts: statusCounts.reduce((acc, item) => {
        acc[item.status] = parseInt(item.count);
        return acc;
      }, {}),
      totalRevenue: totalRevenue.total || 0,
    };
  }
}