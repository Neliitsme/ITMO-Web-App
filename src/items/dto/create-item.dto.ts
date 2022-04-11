import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    name: 'name',
    type: 'string',
    description: 'Item name',
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    name: 'userId',
    type: 'integer',
    description: 'id of a user that item belongs to',
  })
  userId: number;

  @ApiProperty({
    name: 'placeId',
    type: 'integer',
    description: 'id of a place that item belongs to',
  })
  placeId: number;

  @ApiPropertyOptional({
    name: 'description',
    type: 'string',
    description: 'Description of an item',
    maxLength: 255,
  })
  description: string;
}
