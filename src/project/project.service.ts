import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async getAllProjects(): Promise<Project[]> {
    return this.prismaService.project.findMany();
  }

  async getProjectByID(projectId: number): Promise<Project> {
    return this.prismaService.project.findUnique({
      where: {
        projectId,
      },
    });
  }

  async createProject(data: Project): Promise<Project> {
    return this.prismaService.project.create({
      data,
    });
  }

  async updateProject(projectId: number, data: Project): Promise<Project> {
    return this.prismaService.project.update({
      where: {
        projectId,
      },
      data,
    });
  }

  async deleteProject(projectId: number): Promise<Project> {
    return this.prismaService.project.delete({
      where: {
        projectId,
      },
    });
  }
}
