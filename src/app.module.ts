import { Module } from '@nestjs/common';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { UserProjectModule } from './user-project/user-project.module';

@Module({
  imports: [EnterpriseModule, ProjectModule, UserModule, UserProjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
