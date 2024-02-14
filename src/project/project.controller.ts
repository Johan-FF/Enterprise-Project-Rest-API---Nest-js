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
import { ProjectService } from './project.service';
import { Project } from '@prisma/client';
import { EnterpriseService } from 'src/enterprise/enterprise.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly enterpriseService: EnterpriseService,
  ) {}

  @Get()
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  async getProjectByID(@Param('id') id: string) {
    const project = await this.projectService.getProjectByID(Number(id));
    if (!project)
      throw new NotFoundException(`Project with id: ${id} not exists in DB.`);
    return project;
  }

  @Post()
  async createProject(@Body() data: Project) {
    try {
      const enterpriseExist = await this.enterpriseService.getEnterpriseByID(
        data.enterpriseId,
      );
      if (!enterpriseExist)
        throw new NotFoundException(
          'Enterprise ID incorrect to create a Project.',
        );

      if ('projectId' in data) delete data.projectId;
      return await this.projectService.createProject(data);
    } catch (error) {
      throw new BadRequestException('Data types or data are incorrects.');
    }
  }

  @Put(':id')
  async updateProject(@Param('id') id: string, @Body() data: Project) {
    try {
      data = this.validateDataToUpdate(data);

      return await this.projectService.updateProject(Number(id), data);
    } catch (error) {
      throw new BadRequestException(
        'Data types are incorrects or id not exists in DB.',
      );
    }
  }

  @Put('start/:id')
  async setStartDate(@Param('id') id: string, @Body() data: Project) {
    try {
      data = this.validateDataToUpdate(data);
      data.startDate = new Date();
      return await this.projectService.updateProject(Number(id), data);
    } catch (error) {
      throw new BadRequestException(
        'Data types are incorrects or id not exists in DB.',
      );
    }
  }

  @Put('end/:id')
  async setEndDate(@Param('id') id: string, @Body() data: Project) {
    try {
      data = this.validateDataToUpdate(data);
      data.endDate = new Date();
      return await this.projectService.updateProject(Number(id), data);
    } catch (error) {
      throw new BadRequestException(
        'Data types are incorrects or id not exists in DB.',
      );
    }
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    try {
      return await this.projectService.deleteProject(Number(id));
    } catch (error) {
      throw new NotFoundException(`Project with id: ${id} not exists in DB.`);
    }
  }

  private validateDataToUpdate(data: Project) {
    data.updateAt = new Date();
    if ('startDate' in data) delete data.startDate;
    if ('endDate' in data) delete data.endDate;
    if ('createdAt' in data) delete data.createdAt;
    if ('projectId' in data) delete data.projectId;
    return data;
  }
}
