import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  postalCode?: string;

  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  latitude?: number;

  @Column('decimal', { precision: 11, scale: 8, nullable: true })
  longitude?: number;

  @Column('simple-array', { nullable: true })
  images?: string[];

  @Column('simple-array', { nullable: true })
  amenities?: string[];

  @Column('simple-array', { nullable: true })
  cuisineTypes?: string[];

  @Column({ default: 0 })
  capacity: number;

  @Column({ default: true })
  isActive: boolean;

  @Column('uuid')
  hostId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'hostId' })
  host: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}