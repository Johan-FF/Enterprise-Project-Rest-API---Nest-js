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

import { User } from '@prisma/client';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { UserService } from './user.service';
import { ProjectService } from 'src/project/project.service';
import { UserProjectService } from 'src/user-project/user-project.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly enterpriseService: EnterpriseService,
    private readonly projectService: ProjectService,
    private readonly userProjectService: UserProjectService,
  ) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserByID(@Param('id') id: string) {
    const user = await this.userService.getUserByID(Number(id));
    if (!user)
      throw new NotFoundException(`User with id: ${id} not exists in DB.`);
    return user;
  }

  @Post()
  async createUser(@Body() data: User) {
    try {
      if (await this.verifyEnterpriseNotExists(data.enterpriseId))
        throw new Error('enterpriseId');

      if (await this.verifyProjectNotExists(data.projectId))
        throw new Error('projectId');

      if ('userId' in data) delete data.userId;
      return await this.userService.createUser(data).then((res: User) => {
        this.userProjectService.createUserProject({
          userProjectId: 0,
          projectId: data.projectId,
          userId: res.userId,
        });
        return res;
      });
    } catch (error) {
      if (error.message === 'enterpriseId')
        throw new NotFoundException(
          'Enterprise ID incorrect to create a User.',
        );
      else if (error.message === 'projectId')
        throw new NotFoundException('Project ID incorrect to create a User.');
      else throw new BadRequestException('Data types or data are incorrects.');
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: User) {
    try {
      data.updateAt = new Date();
      if ('createdAt' in data) delete data.createdAt;
      if ('userId' in data) delete data.userId;

      if (!('enterpriseId' in data) && !('projectId' in data))
        return await this.userService.updateUser(Number(id), data);

      if ('enterpriseId' in data) {
        const enterpriseNotExists = await this.verifyEnterpriseNotExists(
          data.enterpriseId,
        );
        if (enterpriseNotExists) throw new Error('enterpriseId');
      }

      if ('projectId' in data) {
        const projectNotExists = await this.verifyProjectNotExists(
          data.projectId,
        );
        if (projectNotExists) throw new Error('projectId');
      }

      return await this.userService.updateUser(Number(id), data);
    } catch (error) {
      if (error.message === 'enterpriseId')
        throw new NotFoundException(
          'Enterprise ID incorrect to create a User.',
        );
      else if (error.message === 'projectId')
        throw new NotFoundException('Project ID incorrect to create a User.');
      else
        throw new BadRequestException(
          'Data types are incorrects or id not exists in DB.',
        );
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const user = await this.userService.getUserByID(Number(id));
      if (!user)
        throw new NotFoundException(`User with id: ${id} not exists in DB.`);
      return await this.userService.deleteUser(Number(id));
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(`User with id: ${id} not exists in DB.`);
      else
        throw new ConflictException('It is not possible to delete the record.');
    }
  }

  private async verifyEnterpriseNotExists(enterpriseId: number) {
    const enterpriseExist =
      await this.enterpriseService.getEnterpriseByID(enterpriseId);
    if (!enterpriseExist) return true;
    return false;
  }

  private async verifyProjectNotExists(projectId: number) {
    const projectExist = await this.projectService.getProjectByID(projectId);
    if (!projectExist) return true;
    return false;
  }
}
