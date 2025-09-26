import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { BookingStatus, PaymentStatus } from '../booking.entity';

export class CreateBookingDto {
  @IsNumber()
  @Type(() => Number)
  guestCount: number;

  @IsOptional()
  @IsString()
  specialRequests?: string;

  @IsUUID()
  experienceId: string;

  @IsUUID()
  availabilityId: string;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  guestCount?: number;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @IsOptional()
  @IsString()
  specialRequests?: string;

  @IsOptional()
  @IsString()
  cancellationReason?: string;
}

export class BookingQueryDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  experienceId?: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}