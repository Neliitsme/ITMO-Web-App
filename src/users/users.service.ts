import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import * as bcrypt from 'bcrypt';
import { deleteUser } from 'supertokens-node';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    let user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (user) {
      return user;
    }

    throw new UserNotFoundException(userWhereUniqueInput.id);
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    let createdUser = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    // Todo: Remove after adding serialization
    createdUser.password = null;
    return createdUser;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return await this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    let userUuid = await this.prisma.user.findUnique({
      where: where,
      select: { uuid: true },
    });

    const [deletedUser] = await Promise.all([
      this.prisma.user.delete({
        where,
      }),
      await deleteUser(userUuid.uuid),
    ]);
    return deletedUser;
  }

  //Todo implement
  async updatePassword() {
    return;
  }
}
