import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { Enterprise } from '@prisma/client';

@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get()
  async getAllEnterprises() {
    return this.enterpriseService.getAllEnterprises();
  }

  @Get(':id')
  async getEnterpriseByID(@Param('id') id: string) {
    const enterprise = await this.enterpriseService.getEnterpriseByID(
      Number(id),
    );
    if (!enterprise)
      throw new NotFoundException(
        `Enterprise with id: ${id} not exists in DB.`,
      );
    return enterprise;
  }

  @Post()
  async createEnterprise(@Body() data: Enterprise) {
    try {
      if ('enterpriseId' in data) delete data.enterpriseId;
      return await this.enterpriseService.createEnterprise(data);
    } catch (error) {
      throw new BadRequestException('Data types or data are incorrects.');
    }
  }

  @Put(':id')
  async updateEnterprise(@Param('id') id: string, @Body() data: Enterprise) {
    try {
      data.updateAt = new Date();
      if ('createdAt' in data) delete data.createdAt;
      if ('enterpriseId' in data) delete data.enterpriseId;

      return await this.enterpriseService.updateEnterprise(Number(id), data);
    } catch (error) {
      throw new BadRequestException(
        'Data types are incorrects or id not exists in DB.',
      );
    }
  }

  @Delete(':id')
  async deleteEnterprise(@Param('id') id: string) {
    try {
      return await this.enterpriseService.deleteEnterprise(Number(id));
    } catch (error) {
      throw new NotFoundException(
        `Enterprise with id: ${id} not exists in DB.`,
      );
    }
  }
}
