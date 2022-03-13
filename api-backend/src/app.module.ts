import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BidModule } from './bid/bid.module';
import { validate } from './config/env.validation';
import { RegisterModule } from './register/register.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AchievementController } from './achievement/achievement.controller';
import { AchievementService } from './achievement/achievement.service';
import { AchievementModule } from './achievement/achievement.module';

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
