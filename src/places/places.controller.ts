import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { AssignPlaceDto } from './dto/assign-place.dto';
import { Place as PlaceModel } from '@prisma/client';
import { Place as PlaceEntity } from './place.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StrictAuthGuard } from '../auth/strict-auth.guard';

@ApiTags('places')
@Controller('places')
@UseGuards(StrictAuthGuard)
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @ApiOperation({ summary: 'Create new place' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The place has been successfully created.',
    type: PlaceEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Check the request body for errors.',
  })
  @Post()
  async create(@Body() createPlaceDto: CreatePlaceDto): Promise<PlaceModel> {
    return this.placesService.createPlace(createPlaceDto);
  }

  @ApiOperation({ summary: 'Get all places' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful operation.' })
  @Get()
  async findAll(): Promise<PlaceModel[]> {
    return this.placesService.places({});
  }

  @ApiOperation({ summary: 'Get place by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation.',
    type: PlaceEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PlaceModel> {
    return this.placesService.place({ id: Number(id) });
  }

  @ApiOperation({ summary: 'Assign place to user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The place info have been successfully edited.',
    type: PlaceEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Check the request body for errors.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'One or more records were not found.',
  })
  @Patch(':id')
  async assignToUser(
    @Param('id') id: string,
    @Body() assignPlaceDto: AssignPlaceDto,
  ): Promise<PlaceModel> {
    return this.placesService.updatePlace({
      where: { id: Number(id) },
      data: { user: { connect: { id: assignPlaceDto.userId } } },
    });
  }

  @ApiOperation({ summary: 'Delete place by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation.',
    type: PlaceEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PlaceModel> {
    return this.placesService.deletePlace({ id: Number(id) });
  }
}
