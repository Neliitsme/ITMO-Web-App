import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Place, Prisma } from '@prisma/client';
import { CreatePlaceDto } from './dto/create-place.dto';
import { AssignPlaceDto } from './dto/assign-place.dto';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}

  async place(
    placeWhereUniqueInput: Prisma.PlaceWhereUniqueInput,
  ): Promise<Place | null> {
    return this.prisma.place.findUnique({
      where: placeWhereUniqueInput,
    });
  }

  async places(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlaceWhereUniqueInput;
    where?: Prisma.PlaceWhereInput;
    orderBy?: Prisma.PlaceOrderByWithRelationInput;
  }): Promise<Place[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.place.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPlace(data: Prisma.PlaceCreateInput): Promise<Place> {
    return this.prisma.place.create({
      data,
    });
  }

  async updatePlace(params: {
    where: Prisma.PlaceWhereUniqueInput;
    data: Prisma.PlaceUpdateInput;
  }): Promise<Place> {
    const { data, where } = params;
    return this.prisma.place.update({
      data,
      where,
    });
  }

  async deletePlace(where: Prisma.PlaceWhereUniqueInput): Promise<Place> {
    return this.prisma.place.delete({
      where,
    });
  }

  async updatePlaceOccupation(
    where: Prisma.PlaceWhereUniqueInput,
  ): Promise<Place> {
    let place = await this.prisma.place.findUnique({ where });
    const placeItems = await this.prisma.item.findMany({
      where: { place: place },
    });

    if (placeItems.length) {
      place = await this.prisma.place.update({
        data: { occupation: 'OCCUPIED' },
        where: { id: place.id },
      });
    } else {
      place = await this.prisma.place.update({
        data: { occupation: 'UNOCCUPIED' },
        where: { id: place.id },
      });
    }

    return place;
  }
}
