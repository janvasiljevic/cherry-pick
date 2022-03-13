import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AchievementService } from './achievement.service';
import { RequestWithUAT } from '../common/interfaces/tokens.interface';
import {CreateAchievementDto} from "./dto/create-achievement.dto";
import {UserTypeGuard} from "../auth/guard/user-types.guard";
import {Roles} from "../common/decorators/roles.decorator";

@Controller('achievement')
@UseGuards(UserTypeGuard)
@ApiTags('Achievements')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post('')
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Create new achievement',
    description: 'Create new smart contract that can mint NFT achievements',
  })
  createNewAchievement(@Body() createAchievementDto: CreateAchievementDto, @Request() { user: admin }: RequestWithUAT) {
    return this.achievementService.create(createAchievementDto, admin.sub);
  }

  @Post('give-badge')
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'Give a achievement badge',
    description: 'Create new smart contract that can mint NFT achievements',
  })
  giveAchievementBadge(@Body() createAchievementDto: CreateAchievementDto, @Request() { user: admin }: RequestWithUAT) {
    return this.achievementService.give(createAchievementDto, admin.sub);
  }
}
