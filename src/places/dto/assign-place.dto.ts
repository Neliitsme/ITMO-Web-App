import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignPlaceDto {
  @ApiProperty({
    name: 'userId',
    type: 'integer',
    example: 1,
    description: 'id of a user that place is rented to',
  })
  @IsNumber()
  userId: number;
}
