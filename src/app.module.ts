import { Module } from '@nestjs/common';
import { EnterpriseModule } from './enterprise/enterprise.module';

@Module({
  imports: [EnterpriseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
