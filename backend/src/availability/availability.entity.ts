import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { Experience } from '../experiences/experience.entity';
import { Booking } from '../bookings/booking.entity';

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  BLOCKED = 'blocked',
}

@Entity('availability')
@Index(['experienceId', 'date', 'startTime'], { unique: true })
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  date: Date;

  @Column('time')
  startTime: string; // Format: HH:MM

  @Column('time')
  endTime: string; // Format: HH:MM

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  priceOverride?: number; // Override base price for specific slots

  @Column({ default: 0 })
  bookedSlots: number;

  @Column()
  maxSlots: number; // Maximum number of bookings for this time slot

  @Column({
    type: 'enum',
    enum: AvailabilityStatus,
    default: AvailabilityStatus.AVAILABLE,
  })
  status: AvailabilityStatus;

  @Column('text', { nullable: true })
  notes?: string;

  @Column('uuid')
  experienceId: string;

  @ManyToOne(() => Experience, experience => experience.availability)
  @JoinColumn({ name: 'experienceId' })
  experience: Experience;

  @OneToMany(() => Booking, booking => booking.availability)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}