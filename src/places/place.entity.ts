import { ApiProperty } from '@nestjs/swagger';

export class Place {
  @ApiProperty({
    name: 'id',
    type: 'integer',
    example: 1,
    description: 'Place id',
  })
  id: number;

  @ApiProperty({
    name: 'userId',
    type: 'integer',
    example: 1,
    description: 'Id of a user that place is rented to',
  })
  userId: number;

  @ApiProperty({
    name: 'occupation',
    type: 'string',
    example: 'UNOCCUPIED',
    description: 'Place occupation state',
    enum: ['OCCUPIED', 'UNOCCUPIED'],
  })
  role: string;
}
