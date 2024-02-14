import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EnterpriseService } from 'src/enterprise/enterprise.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, EnterpriseService],
  imports: [PrismaModule],
})
export class ProjectModule {}
