import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place as PlaceModel } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @ApiOperation({ summary: 'Create new place' })
  @ApiResponse({
    status: 201,
    description: 'The place has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the request body for errors.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto): Promise<PlaceModel> {
    return this.placesService.createPlace(createPlaceDto);
  }

  @ApiOperation({ summary: 'Get all places' })
  @Get()
  async findAll(): Promise<PlaceModel[]> {
    return this.placesService.places({});
  }

  @ApiOperation({ summary: 'Get place by id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PlaceModel> {
    return this.placesService.place({ id: Number(id) });
  }

  @ApiOperation({ summary: 'Change place' })
  @ApiResponse({
    status: 200,
    description: 'The place info have been successfully edited.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the request body for errors.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ): Promise<PlaceModel> {
    return this.placesService.updatePlace({
      where: { id: Number(id) },
      data: updatePlaceDto,
    });
  }

  @ApiOperation({ summary: 'Delete place by id' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PlaceModel> {
    return this.placesService.deletePlace({ id: Number(id) });
  }
}
