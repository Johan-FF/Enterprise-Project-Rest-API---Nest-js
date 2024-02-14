import {
  Controller,
  Get,
  Delete,
  Param,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserProjectService } from './user-project.service';

@Controller('user-project')
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}

  @Get()
  async getAllUserProjects() {
    return this.userProjectService.getAllUserProjects();
  }

  @Get(':id')
  async getUserProjectByID(@Param('id') id: string) {
    const userProject = await this.userProjectService.getUserProjectByID(
      Number(id),
    );
    if (!userProject)
      throw new NotFoundException(
        `User-Project with id: ${id} not exists in DB.`,
      );
    return userProject;
  }

  @Get('projects/:id')
  async getProjectsByUserID(@Param('id') id: string) {
    try {
      return this.userProjectService.getProjectsByUserID(Number(id));
    } catch (error) {
      throw new NotFoundException(`User ID ${id} not exists in DB.`);
    }
  }

  @Get('users/:id')
  async getUsersByProjectID(@Param('id') id: string) {
    try {
      return this.userProjectService.getUsersByProjectID(Number(id));
    } catch (error) {
      throw new NotFoundException(`Project ID ${id} not exists in DB.`);
    }
  }

  @Delete(':id')
  async deleteUserProject(@Param('id') id: string) {
    try {
      const userProject = await this.userProjectService.getUserProjectByID(
        Number(id),
      );
      if (!userProject)
        throw new NotFoundException(
          `User-Project with id: ${id} not exists in DB.`,
        );
      return await this.userProjectService.deleteUserProject(Number(id));
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(
          `User-Project with id: ${id} not exists in DB.`,
        );
      else
        throw new ConflictException('It is not possible to delete the record.');
    }
  }
}
