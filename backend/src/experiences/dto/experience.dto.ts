import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, IsBoolean, IsUUID, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ExperienceType } from '../experience.entity';

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ExperienceType)
  type: ExperienceType;

  @IsNumber()
  @Type(() => Number)
  basePrice: number;

  @IsNumber()
  @Type(() => Number)
  duration: number;

  @IsNumber()
  @Type(() => Number)
  minGuests: number;

  @IsNumber()
  @Type(() => Number)
  maxGuests: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includedItems?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsUUID()
  venueId: string;
}

export class UpdateExperienceDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsEnum(ExperienceType)
  type?: ExperienceType;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  basePrice?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  duration?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minGuests?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxGuests?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includedItems?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}