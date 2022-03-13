import {Body, Controller, Post, Request} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AchievementService} from "./achievement.service";
import {RequestWithUAT} from "../common/interfaces/tokens.interface";

@Controller('achievement')
@ApiTags('Achievements')
export class AchievementController {
    constructor(private readonly achievementService: AchievementService) {
    }

    @Post('')
    @ApiOperation({
        summary: "Create new achievement",
        description: "Create new smart contract that can mint NFT achievements"
    })
    createNewAchievement(@Body() createAchievementDto, @Request() {user}: RequestWithUAT) {
        return this.achievementService.create(createAchievementDto, admin.sub)
    }

}
