import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Enterprise } from '@prisma/client';

@Injectable()
export class EnterpriseService {
  constructor(private prismaService: PrismaService) {}

  async getAllEnterprises(): Promise<Enterprise[]> {
    return this.prismaService.enterprise.findMany();
  }

  async getEnterpriseByID(enterpriseId: number): Promise<Enterprise> {
    return this.prismaService.enterprise.findUnique({
      where: {
        enterpriseId,
      },
    });
  }

  async createEnterprise(data: Enterprise): Promise<Enterprise> {
    return this.prismaService.enterprise.create({
      data,
    });
  }

  async updateEnterprise(
    enterpriseId: number,
    data: Enterprise,
  ): Promise<Enterprise> {
    return this.prismaService.enterprise.update({
      where: {
        enterpriseId,
      },
      data,
    });
  }

  async deleteEnterprise(enterpriseId: number): Promise<Enterprise> {
    return this.prismaService.enterprise.delete({
      where: {
        enterpriseId,
      },
    });
  }
}
