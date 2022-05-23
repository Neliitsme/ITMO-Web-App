import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlacesModule } from './places/places.module';
import { ItemsModule } from './items/items.module';
import LoggerMiddleware from './utils/middleware/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './utils/filters/prisma-client-exception.filter';
import { AuthModule } from './auth/auth.module';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import { ActivityCounterModule } from './activity-counter/activity-counter.module';
import { ActivityCounterGateway } from './activity-counter.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PlacesModule,
    ItemsModule,
    AuthModule.forRoot({
      connectionURI: process.env.ST_CONNECTION_URI,
      apiKey: process.env.ST_API_KEY,
      appInfo: {
        appName: 'Nelige',
        apiDomain: process.env.ORIGIN_DOMAIN,
        websiteDomain: process.env.ORIGIN_DOMAIN,
      },
    }),
    ActivityCounterModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: PrismaClientExceptionFilter },
    { provide: APP_FILTER, useClass: SupertokensExceptionFilter },
    ActivityCounterGateway,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
