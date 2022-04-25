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
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item as ItemModel } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({ summary: 'Create new item' })
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
    return this.itemsService.createItem(createItemDto);
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

  @ApiOperation({ summary: 'Delete item by id' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ItemModel> {
    return this.itemsService.deleteItem({ id: Number(id) });
  }
}
