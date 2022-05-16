import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    name: 'name',
    type: 'string',
    example: 'Sock',
    description: 'Item name',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'userId',
    type: 'integer',
    example: 1,
    description: 'id of a user that item belongs to',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    name: 'placeId',
    type: 'integer',
    example: 1,
    description: 'id of a place that item belongs to',
  })
  @IsNumber()
  placeId: number;

  @ApiPropertyOptional({
    name: 'description',
    type: 'string',
    example: 'A single yellow striped sock',
    description: 'Description of an item',
    maxLength: 255,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;
}
