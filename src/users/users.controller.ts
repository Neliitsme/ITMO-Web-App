import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the request body for errors.',
  })
  @ApiResponse({
    status: 500,
    description:
      'Internal server error. Probably a User with such email already exists.',
  })
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.usersService.users({});
  }



  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.user({ id: Number(id) });
  }

  @ApiOperation({ summary: 'Change user' })
  @ApiResponse({
    status: 200,
    description: 'The user info have been successfully edited.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Check the request body for errors.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
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
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
