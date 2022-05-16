import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
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
