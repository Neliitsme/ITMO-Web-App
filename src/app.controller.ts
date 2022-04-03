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
import { UserService } from './user/user.service';
import { PlaceService } from './place/place.service';
import { ItemService } from './item/item.service';
import {
  User as UserModel,
  Place as PlaceModel,
  Item as ItemModel,
} from '@prisma/client';
import { TransformInterceptor } from './transform.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get(['index', '/'])
  @Render('includes/content/index')
  index() {
    return { title: 'Nelige' };
  }

  @Get('about')
  @Render('includes/content/about')
  about() {
    return { title: 'About' };
  }

  @Get('tracking')
  @Render('includes/content/tracking')
  tracking() {
    return { title: 'Tracking' };
  }

  @Get('profile')
  @UseInterceptors(TransformInterceptor)
  @Render('includes/content/profile')
  profile(@Req() request: Request) {
    return { title: 'Profile', loginInfo: request.cookies };
  }
}
