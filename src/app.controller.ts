import {
  Controller,
  Get,
  Post,
  Render,
  Param,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { PlacesService } from './places/places.service';
import { ItemsService } from './items/items.service';
import {
  User as UserModel,
  Place as PlaceModel,
  Item as ItemModel,
} from '@prisma/client';
import { TransformInterceptor } from './transform.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('root')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get index page' })
  @Get(['/', 'index'])
  @Render('includes/content/index')
  index() {
    return;
  }

  @ApiOperation({ summary: 'Get about page' })
  @Get('about')
  @Render('includes/content/about')
  about() {
    return;
  }

  @ApiOperation({ summary: 'Get tracking page' })
  @Get('tracking')
  @Render('includes/content/tracking')
  tracking() {
    return;
  }

  @ApiOperation({ summary: 'Get profile page' })
  @Get('profile')
  @UseInterceptors(TransformInterceptor)
  @Render('includes/content/profile')
  profile(@Req() request: Request) {
    return { loginInfo: request.cookies };
  }

  @ApiOperation({ summary: 'Get tools page' })
  @Get('tools')
  @Render('includes/content/tools')
  tools(@Req() request: Request) {
    return { loginInfo: request.cookies };
  }

  @ApiOperation({ summary: 'Get login page' })
  @Get('login')
  @Render('includes/content/login')
  login(@Req() request: Request) {
    return { loginInfo: request.cookies };
  }

  @ApiOperation({ summary: 'Get sign up page' })
  @Get('signup')
  @Render('includes/content/signup')
  signup(@Req() request: Request) {
    return { loginInfo: request.cookies };
  }
}
