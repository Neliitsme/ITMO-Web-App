import { ApiProperty } from '@nestjs/swagger';

export class Item {
  @ApiProperty({
    name: 'id',
    type: 'integer',
    example: 1,
    description: 'Item id',
  })
  id: number;

  @ApiProperty({
    name: 'name',
    type: 'string',
    example: 'Sock',
    description: 'Item name',
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    name: 'userId',
    type: 'integer',
    example: 1,
    description: 'id of a user that item belongs to',
  })
  userId: number;

  @ApiProperty({
    name: 'placeId',
    type: 'integer',
    example: 1,
    description: 'id of a place that item belongs to',
  })
  placeId: number;

  @ApiProperty({
    name: 'description',
    type: 'string',
    example: 'A single yellow striped sock',
    nullable: true,
    description: 'Description of an item',
    maxLength: 255,
  })
  description: string;
}
