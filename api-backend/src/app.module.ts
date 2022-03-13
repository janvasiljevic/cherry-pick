import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AchievementModule } from './achievement/achievement.module';
import { AuthModule } from './auth/auth.module';
import { BidModule } from './bid/bid.module';
import { validate } from './config/env.validation';
import { RegisterModule } from './register/register.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env', '.env.production'], validate, isGlobal: true }),
    PrismaModule,
    AuthModule,
    RegisterModule,
    BidModule,
    UserModule,
    AchievementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
