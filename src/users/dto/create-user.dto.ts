import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, isNotEmpty, IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ name: 'name', type: 'string', description: 'Username' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ name: 'email', type: 'string', description: "User's email" })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
