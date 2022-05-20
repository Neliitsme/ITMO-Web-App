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
import { ItemsService } from './items.service';
import { PlacesService } from '../places/places.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item as ItemEntity } from './item.entity';
import { Item as ItemModel } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StrictAuthGuard } from '../auth/strict-auth.guard';

@ApiTags('items')
@Controller('items')
@UseGuards(StrictAuthGuard)
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly placeService: PlacesService,
  ) {}

  @ApiOperation({
    summary: "Create new item, updates place's occupation state",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The item has been successfully created.',
    type: ItemEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Check the request body for errors.',
  })
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<ItemModel> {
    const createdItem = await this.itemsService.createItem(createItemDto);
    await this.placeService.updatePlaceOccupation({
      id: createItemDto.placeId,
    });
    return createdItem;
  }

  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful operation.' })
  @Get()
  async findAll(): Promise<ItemModel[]> {
    return this.itemsService.items({});
  }

  @ApiOperation({ summary: 'Get item by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation.',
    type: ItemEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ItemModel> {
    return this.itemsService.item({ id: Number(id) });
  }

  @ApiOperation({ summary: 'Change item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The item info have been successfully edited.',
    type: ItemEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Check the request body for errors.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<ItemModel> {
    return this.itemsService.updateItem({
      where: { id: Number(id) },
      data: updateItemDto,
    });
  }

  @ApiOperation({
    summary: "Delete item by id, updates place's occupation state",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation.',
    type: ItemEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ItemModel> {
    const deletedItem = await this.itemsService.deleteItem({
      id: Number(id),
    });
    await this.placeService.updatePlaceOccupation({ id: deletedItem.placeId });
    return deletedItem;
  }

  @ApiOperation({ summary: 'Get all items of user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful operation.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found',
  })
  @Get('user/:id')
  async findUserItems(@Param('id') id: string): Promise<ItemModel[]> {
    return this.itemsService.userItems({ where: { id: Number(id) } });
  }
}
