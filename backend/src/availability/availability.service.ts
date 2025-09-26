import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Availability, AvailabilityStatus } from './availability.entity';
import { Experience } from '../experiences/experience.entity';
import { CreateAvailabilityDto, UpdateAvailabilityDto, BulkCreateAvailabilityDto } from './dto/availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
  ) {}

  async create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    // Verify experience exists
    const experience = await this.experiencesRepository.findOne({
      where: { id: createAvailabilityDto.experienceId },
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    // Check for duplicate availability
    const existingAvailability = await this.availabilityRepository.findOne({
      where: {
        experienceId: createAvailabilityDto.experienceId,
        date: new Date(createAvailabilityDto.date),
        startTime: createAvailabilityDto.startTime,
      },
    });

    if (existingAvailability) {
      throw new ConflictException('Availability slot already exists for this time');
    }

    // Validate time format and logic
    this.validateTimeSlot(createAvailabilityDto.startTime, createAvailabilityDto.endTime);

    const availability = this.availabilityRepository.create({
      ...createAvailabilityDto,
      date: new Date(createAvailabilityDto.date),
    });

    return await this.availabilityRepository.save(availability);
  }

  async createBulk(bulkCreateDto: BulkCreateAvailabilityDto): Promise<Availability[]> {
    const { startDate, endDate, experienceId, excludeDays = [], ...slotData } = bulkCreateDto;

    // Verify experience exists
    const experience = await this.experiencesRepository.findOne({
      where: { id: experienceId },
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const availabilitySlots: Availability[] = [];

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      
      if (excludeDays.includes(dayName)) {
        continue;
      }

      // Check if availability already exists for this date and time
      const existing = await this.availabilityRepository.findOne({
        where: {
          experienceId,
          date: new Date(date),
          startTime: slotData.startTime,
        },
      });

      if (!existing) {
        const availability = this.availabilityRepository.create({
          ...slotData,
          experienceId,
          date: new Date(date),
        });
        
        availabilitySlots.push(availability);
      }
    }

    if (availabilitySlots.length === 0) {
      throw new BadRequestException('No new availability slots to create');
    }

    return await this.availabilityRepository.save(availabilitySlots);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    experienceId?: string,
    startDate?: string,
    endDate?: string,
    status?: AvailabilityStatus,
  ): Promise<{ availability: Availability[]; total: number; page: number; limit: number }> {
    const queryBuilder = this.availabilityRepository
      .createQueryBuilder('availability')
      .leftJoinAndSelect('availability.experience', 'experience')
      .leftJoinAndSelect('experience.venue', 'venue');

    if (experienceId) {
      queryBuilder.andWhere('availability.experienceId = :experienceId', { experienceId });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere('availability.date BETWEEN :startDate AND :endDate', {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    }

    if (status) {
      queryBuilder.andWhere('availability.status = :status', { status });
    }

    const [availability, total] = await queryBuilder
      .orderBy('availability.date', 'ASC')
      .addOrderBy('availability.startTime', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      availability,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Availability> {
    const availability = await this.availabilityRepository.findOne({
      where: { id },
      relations: ['experience', 'experience.venue', 'experience.venue.host'],
    });

    if (!availability) {
      throw new NotFoundException('Availability not found');
    }

    return availability;
  }

  async findByExperience(
    experienceId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<Availability[]> {
    const queryBuilder = this.availabilityRepository
      .createQueryBuilder('availability')
      .where('availability.experienceId = :experienceId', { experienceId })
      .orderBy('availability.date', 'ASC')
      .addOrderBy('availability.startTime', 'ASC');

    if (startDate && endDate) {
      queryBuilder.andWhere('availability.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    return await queryBuilder.getMany();
  }

  async update(id: string, updateAvailabilityDto: UpdateAvailabilityDto): Promise<Availability> {
    const availability = await this.findOne(id);

    if (updateAvailabilityDto.startTime && updateAvailabilityDto.endTime) {
      this.validateTimeSlot(updateAvailabilityDto.startTime, updateAvailabilityDto.endTime);
    }

    if (updateAvailabilityDto.date) {
      updateAvailabilityDto.date = new Date(updateAvailabilityDto.date).toISOString();
    }

    Object.assign(availability, updateAvailabilityDto);

    return await this.availabilityRepository.save(availability);
  }

  async remove(id: string): Promise<void> {
    const availability = await this.findOne(id);

    // Check if there are any bookings
    if (availability.bookedSlots > 0) {
      throw new BadRequestException('Cannot delete availability with existing bookings');
    }

    await this.availabilityRepository.remove(availability);
  }

  async checkAvailability(availabilityId: string, guestCount: number): Promise<boolean> {
    const availability = await this.findOne(availabilityId);

    if (availability.status !== AvailabilityStatus.AVAILABLE) {
      return false;
    }

    const availableSlots = availability.maxSlots - availability.bookedSlots;
    return availableSlots >= guestCount;
  }

  async reserveSlots(availabilityId: string, guestCount: number): Promise<void> {
    const availability = await this.findOne(availabilityId);

    if (!await this.checkAvailability(availabilityId, guestCount)) {
      throw new BadRequestException('Not enough available slots');
    }

    availability.bookedSlots += guestCount;

    if (availability.bookedSlots >= availability.maxSlots) {
      availability.status = AvailabilityStatus.BOOKED;
    }

    await this.availabilityRepository.save(availability);
  }

  async releaseSlots(availabilityId: string, guestCount: number): Promise<void> {
    const availability = await this.findOne(availabilityId);

    availability.bookedSlots = Math.max(0, availability.bookedSlots - guestCount);

    if (availability.bookedSlots < availability.maxSlots && availability.status === AvailabilityStatus.BOOKED) {
      availability.status = AvailabilityStatus.AVAILABLE;
    }

    await this.availabilityRepository.save(availability);
  }

  private validateTimeSlot(startTime: string, endTime: string): void {
    const start = this.timeToMinutes(startTime);
    const end = this.timeToMinutes(endTime);

    if (start >= end) {
      throw new BadRequestException('Start time must be before end time');
    }
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}