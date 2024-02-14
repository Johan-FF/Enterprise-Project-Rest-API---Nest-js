import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async getUserByID(userId: number): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        userId,
      },
    });
  }

  async createUser(data: User): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  async updateUser(userId: number, data: User): Promise<User> {
    return this.prismaService.user.update({
      where: {
        userId,
      },
      data,
    });
  }

  async deleteUser(userId: number): Promise<User> {
    return this.prismaService.user.delete({
      where: {
        userId,
      },
    });
  }
}
