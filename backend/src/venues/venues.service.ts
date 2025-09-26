import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue } from './venue.entity';
import { CreateVenueDto, UpdateVenueDto } from './dto/venue.dto';

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private venuesRepository: Repository<Venue>,
  ) {}

  async create(createVenueDto: CreateVenueDto): Promise<Venue> {
    const venue = this.venuesRepository.create(createVenueDto);
    return await this.venuesRepository.save(venue);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    city?: string,
    country?: string,
    cuisineTypes?: string[],
    isActive: boolean = true,
  ): Promise<{ venues: Venue[]; total: number; page: number; limit: number }> {
    const queryBuilder = this.venuesRepository
      .createQueryBuilder('venue')
      .leftJoinAndSelect('venue.host', 'host')
      .where('venue.isActive = :isActive', { isActive });

    if (city) {
      queryBuilder.andWhere('LOWER(venue.city) LIKE LOWER(:city)', { city: `%${city}%` });
    }

    if (country) {
      queryBuilder.andWhere('LOWER(venue.country) LIKE LOWER(:country)', { country: `%${country}%` });
    }

    if (cuisineTypes && cuisineTypes.length > 0) {
      queryBuilder.andWhere('venue.cuisineTypes && :cuisineTypes', { cuisineTypes });
    }

    const [venues, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      venues,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Venue> {
    const venue = await this.venuesRepository.findOne({
      where: { id },
      relations: ['host'],
    });

    if (!venue) {
      throw new NotFoundException('Venue not found');
    }

    return venue;
  }

  async findByHost(hostId: string): Promise<Venue[]> {
    return await this.venuesRepository.find({
      where: { hostId },
      relations: ['host'],
    });
  }

  async update(id: string, updateVenueDto: UpdateVenueDto): Promise<Venue> {
    const venue = await this.findOne(id);
    
    Object.assign(venue, updateVenueDto);
    
    return await this.venuesRepository.save(venue);
  }

  async remove(id: string): Promise<void> {
    const venue = await this.findOne(id);
    
    // Soft delete by setting isActive to false
    venue.isActive = false;
    await this.venuesRepository.save(venue);
  }

  async getVenuesWithUpcomingAvailability(): Promise<any[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const venues = await this.venuesRepository
      .createQueryBuilder('venue')
      .leftJoinAndSelect('venue.host', 'host')
      .leftJoin('experience', 'exp', 'exp.venueId = venue.id')
      .leftJoin('availability', 'avail', 'avail.experienceId = exp.id')
      .where('venue.isActive = :isActive', { isActive: true })
      .andWhere('exp.isActive = :expActive', { expActive: true })
      .andWhere('avail.date >= :today', { today })
      .andWhere('avail.status = :status', { status: 'available' })
      .andWhere('avail.bookedSlots < avail.maxSlots')
      .select([
        'venue.id',
        'venue.name',
        'venue.description',
        'venue.address',
        'venue.city',
        'venue.country',
        'venue.images',
        'venue.cuisineTypes',
        'venue.capacity',
        'host.id',
        'host.firstName',
        'host.lastName',
      ])
      .groupBy('venue.id, host.id')
      .getMany();

    return venues;
  }
}