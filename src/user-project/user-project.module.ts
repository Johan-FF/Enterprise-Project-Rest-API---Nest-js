import { Module } from '@nestjs/common';
import { UserProjectController } from './user-project.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserProjectService } from './user-project.service';

@Module({
  controllers: [UserProjectController],
  providers: [UserProjectService],
  imports: [PrismaModule],
})
export class UserProjectModule {}
