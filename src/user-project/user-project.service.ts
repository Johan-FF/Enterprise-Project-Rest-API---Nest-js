import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProject } from '@prisma/client';

@Injectable()
export class UserProjectService {
  constructor(private prismaService: PrismaService) {}

  async getAllUserProjects(): Promise<UserProject[]> {
    return this.prismaService.userProject.findMany();
  }

  async getUserProjectByID(userProjectId: number): Promise<UserProject> {
    return this.prismaService.userProject.findUnique({
      where: {
        userProjectId,
      },
    });
  }

  async getProjectsByUserID(userId: number): Promise<UserProject[]> {
    return this.prismaService.userProject.findMany({
      where: {
        userId,
      },
    });
  }

  async getUsersByProjectID(projectId: number): Promise<UserProject[]> {
    return this.prismaService.userProject.findMany({
      where: {
        projectId,
      },
    });
  }

  async createUserProject(data: UserProject): Promise<UserProject> {
    if ('userProjectId' in data) delete data.userProjectId;
    return this.prismaService.userProject.create({
      data,
    });
  }

  async deleteUserProject(userProjectId: number): Promise<UserProject> {
    return this.prismaService.userProject.delete({
      where: {
        userProjectId,
      },
    });
  }
}
