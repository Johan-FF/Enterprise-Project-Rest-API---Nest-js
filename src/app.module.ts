import { Module } from '@nestjs/common';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EnterpriseModule, ProjectModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
