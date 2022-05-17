import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import {PlacesService} from "../places/places.service";

@Module({
  controllers: [ItemsController],
  providers: [ItemsService, PlacesService, PrismaService],
})
export class ItemsModule {}
