import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PlacesModule, ItemsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
