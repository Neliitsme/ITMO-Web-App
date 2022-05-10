import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    name: 'name',
    type: 'string',
    description: 'Item name',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'userId',
    type: 'integer',
    description: 'id of a user that item belongs to',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    name: 'placeId',
    type: 'integer',
    description: 'id of a place that item belongs to',
  })
  @IsNumber()
  placeId: number;

  @ApiPropertyOptional({
    name: 'description',
    type: 'string',
    description: 'Description of an item',
    maxLength: 255,
  })
  @IsString()
  description: string;
}
