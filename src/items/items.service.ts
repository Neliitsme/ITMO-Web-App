import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Item, Prisma } from '@prisma/client';
import { ItemNotFoundException } from './exceptions/item-not-found.exception';
import { ActivityCounterGateway } from '../activity-counter.gateway';

@Injectable()
export class ItemsService {
  constructor(
    private prisma: PrismaService,
    private activityCounter: ActivityCounterGateway,
  ) {}

  async item(
    itemWhereUniqueInput: Prisma.ItemWhereUniqueInput,
  ): Promise<Item | null> {
    let item = await this.prisma.item.findUnique({
      where: itemWhereUniqueInput,
    });

    if (item) {
      return item;
    }

    throw new ItemNotFoundException(itemWhereUniqueInput.id);
  }

  async items(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ItemWhereUniqueInput;
    where?: Prisma.ItemWhereInput;
    orderBy?: Prisma.ItemOrderByWithRelationInput;
  }): Promise<Item[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.item.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createItem(data: Prisma.ItemCreateInput): Promise<Item> {
    const item = await this.prisma.item.create({
      data,
    });
    await this.activityCounter.sendItemCount();
    return item;
  }

  async updateItem(params: {
    where: Prisma.ItemWhereUniqueInput;
    data: Prisma.ItemUpdateInput;
  }): Promise<Item> {
    const { data, where } = params;
    return await this.prisma.item.update({
      data,
      where,
    });
  }

  async deleteItem(where: Prisma.ItemWhereUniqueInput): Promise<Item> {
    const item = await this.prisma.item.delete({
      where,
    });
    await this.activityCounter.sendItemCount();
    return item;
  }

  async userItems(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ItemWhereUniqueInput;
    where: Prisma.UserWhereUniqueInput;
    orderBy?: Prisma.ItemOrderByWithRelationInput;
  }): Promise<Item[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.item.findMany({
      skip,
      take,
      cursor,
      where: { userId: where.id },
      orderBy,
    });
  }
}
