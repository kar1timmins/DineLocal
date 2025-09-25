import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole, UserStatus } from './user.entity';
import { CreateUserDto, UpdateUserDto, SwitchRoleDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // Create user
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || UserRole.USER,
      status: UserStatus.ACTIVE,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'status', 'createdAt', 'updatedAt'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // If email is being updated, check for conflicts
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
    }

    // Update user
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async switchRole(id: string, switchRoleDto: SwitchRoleDto): Promise<User> {
    const user = await this.findOne(id);

    // Validate role transition
    if (user.role === switchRoleDto.newRole) {
      throw new ConflictException('User already has this role');
    }

    // Allow switching between USER and HOST, but prevent switching to/from STAFF
    if (
      (user.role === UserRole.STAFF || switchRoleDto.newRole === UserRole.STAFF) &&
      user.role !== switchRoleDto.newRole
    ) {
      throw new ConflictException('Cannot switch to/from staff role directly');
    }

    user.role = switchRoleDto.newRole;
    return this.userRepository.save(user);
  }

  async getUsersByRole(role: UserRole): Promise<User[]> {
    return this.userRepository.find({
      where: { role },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'status', 'createdAt'],
    });
  }

  async getHosts(): Promise<User[]> {
    return this.getUsersByRole(UserRole.HOST);
  }

  async getStaff(): Promise<User[]> {
    return this.getUsersByRole(UserRole.STAFF);
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async updatePassword(id: string, newPassword: string): Promise<void> {
    const user = await this.findOne(id);
    const saltRounds = 10;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    await this.userRepository.save(user);
  }

  async activateUser(id: string): Promise<User> {
    return this.update(id, { status: UserStatus.ACTIVE });
  }

  async deactivateUser(id: string): Promise<User> {
    return this.update(id, { status: UserStatus.INACTIVE });
  }

  async suspendUser(id: string): Promise<User> {
    return this.update(id, { status: UserStatus.SUSPENDED });
  }
}