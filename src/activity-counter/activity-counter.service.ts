import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityCounterService {
  constructor(private prisma: PrismaService) {}

  async updateUserCount() {
    return await this.prisma.user.count();
  }

  async updateItemCount() {
    return await this.prisma.item.count();
  }

  async getAllCounters() {
    const userCount = await this.prisma.user.count();
    const itemCount = await this.prisma.item.count();
    return { userCount: userCount, itemCount: itemCount };
  }
}
