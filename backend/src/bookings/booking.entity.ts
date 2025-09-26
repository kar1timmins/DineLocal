import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Experience } from '../experiences/experience.entity';
import { Availability } from '../availability/availability.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NO_SHOW = 'no_show',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  guestCount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  serviceFee?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  taxes?: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Column('text', { nullable: true })
  specialRequests?: string;

  @Column('text', { nullable: true })
  cancellationReason?: string;

  @Column({ nullable: true })
  confirmedAt?: Date;

  @Column({ nullable: true })
  cancelledAt?: Date;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  experienceId: string;

  @Column('uuid')
  availabilityId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Experience, { eager: true })
  @JoinColumn({ name: 'experienceId' })
  experience: Experience;

  @ManyToOne(() => Availability, availability => availability.bookings)
  @JoinColumn({ name: 'availabilityId' })
  availability: Availability;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}