import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  USER = 'user',
  HOST = 'host',
  STAFF = 'staff',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'json', nullable: true })
  preferences?: Record<string, any>;

  // Host-specific fields (only relevant when role is HOST)
  @Column({ nullable: true })
  businessName?: string;

  @Column({ type: 'text', nullable: true })
  businessDescription?: string;

  @Column({ nullable: true })
  businessAddress?: string;

  @Column({ nullable: true })
  businessPhone?: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating?: number;

  @Column({ default: 0 })
  totalReviews: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual properties for convenience
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get isHost(): boolean {
    return this.role === UserRole.HOST;
  }

  get isStaff(): boolean {
    return this.role === UserRole.STAFF;
  }

  get isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }

  // Method to switch between user and host roles
  switchToHost(): void {
    if (this.role === UserRole.USER) {
      this.role = UserRole.HOST;
    }
  }

  switchToUser(): void {
    if (this.role === UserRole.HOST) {
      this.role = UserRole.USER;
    }
  }
}