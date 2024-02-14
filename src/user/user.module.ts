import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { ProjectService } from 'src/project/project.service';
import { UserProjectService } from 'src/user-project/user-project.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    EnterpriseService,
    ProjectService,
    UserProjectService,
  ],
  imports: [PrismaModule],
})
export class UserModule {}
