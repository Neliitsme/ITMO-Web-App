import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ name: 'name', type: 'string', description: 'Username' })
  name: string;

  @ApiProperty({ name: 'email', type: 'string', description: "User's email" })
  email: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    description: "User's password",
  })
  password: string;
}
