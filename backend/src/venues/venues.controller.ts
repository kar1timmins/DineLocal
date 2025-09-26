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
import { VenuesService } from './venues.service';
import { CreateVenueDto, UpdateVenueDto } from './dto/venue.dto';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venuesService.create(createVenueDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('city') city?: string,
    @Query('country') country?: string,
    @Query('cuisineTypes') cuisineTypes?: string,
    @Query('isActive', new DefaultValuePipe(true)) isActive?: boolean,
  ) {
    const cuisineTypesArray = cuisineTypes ? cuisineTypes.split(',') : undefined;
    return this.venuesService.findAll(page, limit, city, country, cuisineTypesArray, isActive);
  }

  @Get('with-availability')
  getVenuesWithUpcomingAvailability() {
    return this.venuesService.getVenuesWithUpcomingAvailability();
  }

  @Get('host/:hostId')
  findByHost(@Param('hostId') hostId: string) {
    return this.venuesService.findByHost(hostId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venuesService.update(id, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venuesService.remove(id);
  }
}