import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { User as UserEntity } from './user.entity';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import * as bcrypt from 'bcrypt';
import { deleteUser } from 'supertokens-node';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserEntity | null> {
    let user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (user) {
      return new UserEntity(user);
    }

    throw new UserNotFoundException(userWhereUniqueInput.id);
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return users.map((user) => new UserEntity(user));
  }

  async createUser(data: Prisma.UserCreateInput): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    let createdUser = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    return new UserEntity(createdUser);
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserEntity> {
    const { where, data } = params;
    const user = await this.prisma.user.update({
      data,
      where,
    });
    return new UserEntity(user);
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
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
    return new UserEntity(deletedUser);
  }
}
