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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.createUser(createUserDto);
  }

  @Get('login')
  @Render('includes/content/login')
  login(@Req() request: Request) {
    return { loginInfo: request.cookies };
  }

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.usersService.users({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.user({ id: Number(id) });
  }

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

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
