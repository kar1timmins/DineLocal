import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsEnum, IsDateString, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { AvailabilityStatus } from '../availability.entity';

export class CreateAvailabilityDto {
  @IsDateString()
  date: string; // ISO date string

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Start time must be in HH:MM format',
  })
  startTime: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'End time must be in HH:MM format',
  })
  endTime: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceOverride?: number;

  @IsNumber()
  @Type(() => Number)
  maxSlots: number;

  @IsOptional()
  @IsEnum(AvailabilityStatus)
  status?: AvailabilityStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsUUID()
  experienceId: string;
}

export class UpdateAvailabilityDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Start time must be in HH:MM format',
  })
  startTime?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'End time must be in HH:MM format',
  })
  endTime?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceOverride?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxSlots?: number;

  @IsOptional()
  @IsEnum(AvailabilityStatus)
  status?: AvailabilityStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class BulkCreateAvailabilityDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  startTime: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  endTime: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  priceOverride?: number;

  @IsNumber()
  @Type(() => Number)
  maxSlots: number;

  @IsUUID()
  experienceId: string;

  @IsOptional()
  @IsString({ each: true })
  excludeDays?: string[]; // ['monday', 'tuesday', etc.]
}