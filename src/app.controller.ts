import { Controller, Get, Render, Redirect, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { StrictAuthGuard } from './auth/strict-auth.guard';
import { Session } from './auth/session.decorator';
import { AuthGuard } from './auth/auth.guard';

@ApiTags('root')
@Controller('/')
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get home page' })
  @Get('home')
  @Render('includes/content/home')
  async home(@Session() session: SessionContainer) {
    return { session };
  }

  @ApiOperation({ summary: 'Get redirected to home page' })
  @Get('/')
  @Redirect('/home', 301)
  rootRedirect() {
    return;
  }

  @ApiOperation({ summary: 'Get about page' })
  @Get('about')
  @Render('includes/content/about')
  async about(@Session() session: SessionContainer) {
    return { session };
  }

  @ApiOperation({ summary: 'Get tracking page' })
  @Get('tracking')
  @Render('includes/content/tracking')
  async tracking(@Session() session: SessionContainer) {
    return { session };
  }

  @ApiOperation({ summary: 'Get profile page' })
  @ApiCookieAuth()
  @Get('profile')
  @UseGuards(StrictAuthGuard)
  @Render('includes/content/profile')
  async profile(@Session() session: SessionContainer) {
    return { session };
  }

  @ApiOperation({ summary: 'Get admin tools page' })
  @ApiCookieAuth()
  @Get('admin-tools')
  @Render('includes/content/admin-tools')
  @UseGuards(StrictAuthGuard)
  async tools(@Session() session: SessionContainer) {
    return { session };
  }

  @ApiOperation({ summary: 'Get login page' })
  @Get('login')
  @Render('includes/content/login')
  async login(@Session() session: SessionContainer) {
    return { session };
  }

  @ApiOperation({ summary: 'Get sign up page' })
  @Get('signup')
  @Render('includes/content/signup')
  async signup(@Session() session: SessionContainer) {
    return { session };
  }
}
