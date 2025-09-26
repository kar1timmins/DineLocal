import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from './experience.entity';
import { Venue } from '../venues/venue.entity';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
    @InjectRepository(Venue)
    private venuesRepository: Repository<Venue>,
  ) {}

  async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    // Verify venue exists
    const venue = await this.venuesRepository.findOne({
      where: { id: createExperienceDto.venueId },
    });

    if (!venue) {
      throw new NotFoundException('Venue not found');
    }

    const experience = this.experiencesRepository.create(createExperienceDto);
    return await this.experiencesRepository.save(experience);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    venueId?: string,
    type?: string,
    isActive: boolean = true,
  ): Promise<{ experiences: Experience[]; total: number; page: number; limit: number }> {
    const queryBuilder = this.experiencesRepository
      .createQueryBuilder('experience')
      .leftJoinAndSelect('experience.venue', 'venue')
      .leftJoinAndSelect('venue.host', 'host')
      .where('experience.isActive = :isActive', { isActive });

    if (venueId) {
      queryBuilder.andWhere('experience.venueId = :venueId', { venueId });
    }

    if (type) {
      queryBuilder.andWhere('experience.type = :type', { type });
    }

    const [experiences, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      experiences,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Experience> {
    const experience = await this.experiencesRepository.findOne({
      where: { id },
      relations: ['venue', 'venue.host'],
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    return experience;
  }

  async findByVenue(venueId: string): Promise<Experience[]> {
    return await this.experiencesRepository.find({
      where: { venueId, isActive: true },
      relations: ['venue'],
    });
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
    const experience = await this.findOne(id);
    
    Object.assign(experience, updateExperienceDto);
    
    return await this.experiencesRepository.save(experience);
  }

  async remove(id: string): Promise<void> {
    const experience = await this.findOne(id);
    
    // Soft delete by setting isActive to false
    experience.isActive = false;
    await this.experiencesRepository.save(experience);
  }

  async getExperiencesWithAvailability(
    startDate: Date,
    endDate: Date,
    venueId?: string,
  ): Promise<any[]> {
    const queryBuilder = this.experiencesRepository
      .createQueryBuilder('exp')
      .leftJoinAndSelect('exp.venue', 'venue')
      .leftJoinAndSelect('venue.host', 'host')
      .leftJoin('exp.availability', 'avail')
      .where('exp.isActive = :isActive', { isActive: true })
      .andWhere('venue.isActive = :venueActive', { venueActive: true })
      .andWhere('avail.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .andWhere('avail.status = :status', { status: 'available' })
      .andWhere('avail.bookedSlots < avail.maxSlots');

    if (venueId) {
      queryBuilder.andWhere('exp.venueId = :venueId', { venueId });
    }

    return await queryBuilder.getMany();
  }
}