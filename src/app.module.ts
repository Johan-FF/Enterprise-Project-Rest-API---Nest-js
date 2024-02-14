import { Module } from '@nestjs/common';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [EnterpriseModule, ProjectModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
