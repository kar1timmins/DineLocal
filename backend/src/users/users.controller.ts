import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, SwitchRoleDto } from './dto/user.dto';
import { UserRole } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('role') role?: UserRole) {
    if (role) {
      return this.usersService.getUsersByRole(role);
    }
    return this.usersService.findAll();
  }

  @Get('hosts')
  getHosts() {
    return this.usersService.getHosts();
  }

  @Get('staff')
  getStaff() {
    return this.usersService.getStaff();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/role')
  @HttpCode(HttpStatus.OK)
  switchRole(@Param('id') id: string, @Body() switchRoleDto: SwitchRoleDto) {
    return this.usersService.switchRole(id, switchRoleDto);
  }

  @Patch(':id/activate')
  @HttpCode(HttpStatus.OK)
  activateUser(@Param('id') id: string) {
    return this.usersService.activateUser(id);
  }

  @Patch(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  deactivateUser(@Param('id') id: string) {
    return this.usersService.deactivateUser(id);
  }

  @Patch(':id/suspend')
  @HttpCode(HttpStatus.OK)
  suspendUser(@Param('id') id: string) {
    return this.usersService.suspendUser(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}