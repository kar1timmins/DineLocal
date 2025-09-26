import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto, BookingQueryDto } from './dto/booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Request() req: any, @Body() createBookingDto: CreateBookingDto) {
    // In a real app, you'd extract the user ID from JWT token
    const userId = req.user?.id || 'user-id-from-auth';
    return this.bookingsService.create(userId, createBookingDto);
  }

  @Get()
  findAll(@Query() queryDto: BookingQueryDto) {
    return this.bookingsService.findAll(queryDto);
  }

  @Get('stats')
  getStats(@Query('hostId') hostId?: string) {
    return this.bookingsService.getBookingStats(hostId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.bookingsService.findByUser(userId);
  }

  @Get('host/:hostId')
  findByHost(@Param('hostId') hostId: string) {
    return this.bookingsService.findByHost(hostId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Patch(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.bookingsService.confirm(id);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.bookingsService.markAsCompleted(id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @Body('reason') reason?: string) {
    return this.bookingsService.cancel(id, reason);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.cancel(id, 'Deleted by user');
  }
}