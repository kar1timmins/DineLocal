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
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experiencesService.create(createExperienceDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('venueId') venueId?: string,
    @Query('type') type?: string,
    @Query('isActive', new DefaultValuePipe(true)) isActive?: boolean,
  ) {
    return this.experiencesService.findAll(page, limit, venueId, type, isActive);
  }

  @Get('with-availability')
  getExperiencesWithAvailability(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('venueId') venueId?: string,
  ) {
    return this.experiencesService.getExperiencesWithAvailability(
      new Date(startDate),
      new Date(endDate),
      venueId,
    );
  }

  @Get('venue/:venueId')
  findByVenue(@Param('venueId') venueId: string) {
    return this.experiencesService.findByVenue(venueId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
    return this.experiencesService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(id);
  }
}