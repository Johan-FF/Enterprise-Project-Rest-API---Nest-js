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
  ConflictException,
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
      if (await this.verifyEnterpriseNotExists(data.enterpriseId))
        throw new NotFoundException(
          'Enterprise ID incorrect to create a Project.',
        );

      if ('projectId' in data) delete data.projectId;
      return await this.projectService.createProject(data);
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(
          'Enterprise ID incorrect to create a Project.',
        );
      else throw new BadRequestException('Data types or data are incorrects.');
    }
  }

  @Put(':id')
  async updateProject(@Param('id') id: string, @Body() data: Project) {
    try {
      data = this.validateDataToUpdate(data);

      if (!('enterpriseId' in data))
        return await this.projectService.updateProject(Number(id), data);

      if (await this.verifyEnterpriseNotExists(data.enterpriseId))
        throw new NotFoundException(
          'Enterprise ID incorrect to create a Project.',
        );
      return await this.projectService.updateProject(Number(id), data);
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(
          'Enterprise ID incorrect to create a Project.',
        );
      else
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

      if (!('enterpriseId' in data))
        return await this.projectService.updateProject(Number(id), data);

      if (await this.verifyEnterpriseNotExists(data.enterpriseId))
        throw new NotFoundException(
          'Enterprise ID incorrect to create a Project.',
        );
      return await this.projectService.updateProject(Number(id), data);
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(
          'Enterprise ID incorrect to create a Project.',
        );
      else
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

      if (!('enterpriseId' in data))
        return await this.projectService.updateProject(Number(id), data);

      if (await this.verifyEnterpriseNotExists(data.enterpriseId))
        throw new NotFoundException(
          'Enterprise ID incorrect to create a Project.',
        );
      return await this.projectService.updateProject(Number(id), data);
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(
          'Enterprise ID incorrect to create a Project.',
        );
      else
        throw new BadRequestException(
          'Data types are incorrects or id not exists in DB.',
        );
    }
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    try {
      const project = await this.projectService.getProjectByID(Number(id));
      if (!project)
        throw new NotFoundException(`Project with id: ${id} not exists in DB.`);
      return await this.projectService.deleteProject(Number(id));
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(`Project with id: ${id} not exists in DB.`);
      else
        throw new ConflictException('It is not possible to delete the record.');
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

  private async verifyEnterpriseNotExists(enterpriseId: number) {
    const enterpriseExist =
      await this.enterpriseService.getEnterpriseByID(enterpriseId);
    if (!enterpriseExist) return true;
    return false;
  }
}
