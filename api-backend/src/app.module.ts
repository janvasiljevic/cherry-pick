import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { SampleModule } from './sample/sample.module';

import { PrismaModule } from './shared/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env', '.env.production'], validate, isGlobal: true }),
    SampleModule,
    PrismaModule,
    AuthModule,
    RegisterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
