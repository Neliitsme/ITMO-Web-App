import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty, IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'uuid',
    type: 'string',
    example: 'dd87c0d8-3d88-40ff-b61a-e1761006b581',
    description: 'User uuid, get it from SuperTokens',
  })
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @ApiProperty({
    name: 'timeJoined',
    type: 'string',
    example: '1652905417461',
    description: 'User join time, get it from SuperTokens, must be in ISO8601',
  })
  @IsNotEmpty()
  @IsNumberString()
  timeJoined: string;

  @ApiProperty({
    name: 'name',
    type: 'string',
    example: 'Jeremy',
    description: 'User name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    example: 'jerma985iscool@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    example: '3P9#uSs%mnBrRW',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
