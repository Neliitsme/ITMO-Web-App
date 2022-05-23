import { Module } from '@nestjs/common';
import { ActivityCounterService } from './activity-counter.service';
import { PrismaService } from '../prisma/prisma.service';
import {ActivityCounterGateway} from "../activity-counter.gateway";

@Module({
  providers: [ActivityCounterService, ActivityCounterGateway, PrismaService],
  exports: [ActivityCounterService, ActivityCounterGateway],
})
export class ActivityCounterModule {}
