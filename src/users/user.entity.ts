import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel, Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User implements UserModel {
  @ApiProperty({
    name: 'id',
    type: 'integer',
    example: 1,
    description: 'User id',
  })
  id: number;

  @ApiProperty({
    name: 'uuid',
    type: 'string',
    example: 'dd87c0d8-3d88-40ff-b61a-e1761006b581',
    description: 'User uuid',
  })
  uuid: string;

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
    name: 'email',
    type: 'string',
    example: '1652905417461',
    description: 'User join time in ISO8601',
  })
  timeJoined: string;

  @ApiProperty({
    name: 'role',
    type: 'string',
    example: 'USER',
    description: 'User role',
    enum: ['USER', 'WORKER', 'ADMIN'],
  })
  role: Role;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
