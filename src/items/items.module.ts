import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlacesService } from '../places/places.service';
import { ActivityCounterModule } from '../activity-counter/activity-counter.module';

@Module({
  imports: [ActivityCounterModule],
  controllers: [ItemsController],
  providers: [ItemsService, PlacesService, PrismaService],
})
export class ItemsModule {}
