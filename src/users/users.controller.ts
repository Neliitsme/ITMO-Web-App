import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';
import { User as UserEntity } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully registered.',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Check the request body for errors.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Unique constraint failed. Email already used.',
  })
  @Post('')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful operation.' })
  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.usersService.users({});
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation.',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.user({ id: Number(id) });
  }

  @ApiOperation({ summary: 'Change user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user info have been successfully edited.',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request. Check the request body for errors.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.usersService.updateUser({
      where: { id: Number(id) },
      data: updateUserDto,
    });
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful operation.',
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
