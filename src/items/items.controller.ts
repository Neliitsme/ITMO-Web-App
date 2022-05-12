import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { PlacesService } from '../places/places.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item as ItemModel } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly placeService: PlacesService,
  ) {}

  @ApiOperation({
    summary: "Create new item, updates place's occupation state",
  })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
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
  async create(@Body() createItemDto: CreateItemDto): Promise<ItemModel> {
    const [createdItem] = await Promise.all([
      this.itemsService.createItem(createItemDto),
      this.placeService.updatePlaceOccupation({ id: createItemDto.placeId }),
    ]);
    return createdItem;
  }

  @ApiOperation({ summary: 'Get all items' })
  @Get()
  async findAll(): Promise<ItemModel[]> {
    return this.itemsService.items({});
  }

  @ApiOperation({ summary: 'Get item by id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ItemModel> {
    return this.itemsService.item({ id: Number(id) });
  }

  @ApiOperation({ summary: 'Change item' })
  @ApiResponse({
    status: 200,
    description: 'The item info have been successfully edited.',
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
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ItemModel> {
    const deletedItem = await this.itemsService.deleteItem({
      id: Number(id),
    });
    await this.placeService.updatePlaceOccupation({ id: deletedItem.placeId });
    return deletedItem;
  }
}
