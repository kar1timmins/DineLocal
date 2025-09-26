import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto, UpdateAvailabilityDto, BulkCreateAvailabilityDto } from './dto/availability.dto';
import { AvailabilityStatus } from './availability.entity';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  create(@Body() createAvailabilityDto: CreateAvailabilityDto) {
    return this.availabilityService.create(createAvailabilityDto);
  }

  @Post('bulk')
  createBulk(@Body() bulkCreateDto: BulkCreateAvailabilityDto) {
    return this.availabilityService.createBulk(bulkCreateDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('experienceId') experienceId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('status') status?: AvailabilityStatus,
  ) {
    return this.availabilityService.findAll(page, limit, experienceId, startDate, endDate, status);
  }

  @Get('experience/:experienceId')
  findByExperience(
    @Param('experienceId') experienceId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.availabilityService.findByExperience(experienceId, start, end);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availabilityService.findOne(id);
  }

  @Get(':id/check/:guestCount')
  checkAvailability(
    @Param('id') id: string,
    @Param('guestCount', ParseIntPipe) guestCount: number,
  ) {
    return this.availabilityService.checkAvailability(id, guestCount);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvailabilityDto: UpdateAvailabilityDto) {
    return this.availabilityService.update(id, updateAvailabilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availabilityService.remove(id);
  }
}