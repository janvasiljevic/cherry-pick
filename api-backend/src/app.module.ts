import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { SampleModule } from './sample/sample.module';

import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env', '.env.production'], validate, isGlobal: true }),
    SampleModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
