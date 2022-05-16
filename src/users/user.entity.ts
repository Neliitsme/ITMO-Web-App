import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    name: 'id',
    type: 'integer',
    example: 1,
    description: 'User id',
  })
  id: number;

  @ApiProperty({
    name: 'name',
    type: 'string',
    example: 'Jeremy',
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    example: 'jerma985iscool@gmail.com',
    description: 'User email',
  })
  email: string;

  @ApiProperty({
    name: 'role',
    type: 'string',
    example: 'USER',
    description: 'User role',
    enum: ['USER', 'WORKER', 'ADMIN'],
  })
  role: string;
}
