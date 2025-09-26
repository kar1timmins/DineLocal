import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Venue } from '../venues/venue.entity';
import { Availability } from '../availability/availability.entity';
import { Booking } from '../bookings/booking.entity';

export enum ExperienceType {
  DINING = 'dining',
  COOKING_CLASS = 'cooking_class',
  WINE_TASTING = 'wine_tasting',
  FOOD_TOUR = 'food_tour',
  PRIVATE_CHEF = 'private_chef',
}

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ExperienceType,
    default: ExperienceType.DINING,
  })
  type: ExperienceType;

  @Column('decimal', { precision: 10, scale: 2 })
  basePrice: number;

  @Column({ default: 60 }) // Duration in minutes
  duration: number;

  @Column({ default: 1 })
  minGuests: number;

  @Column({ default: 10 })
  maxGuests: number;

  @Column('simple-array', { nullable: true })
  images?: string[];

  @Column('simple-array', { nullable: true })
  includedItems?: string[];

  @Column('simple-array', { nullable: true })
  requirements?: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column('uuid')
  venueId: string;

  @ManyToOne(() => Venue)
  @JoinColumn({ name: 'venueId' })
  venue: Venue;

  @OneToMany(() => Availability, availability => availability.experience, { cascade: true })
  availability: Availability[];

  @OneToMany(() => Booking, booking => booking.experience)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}