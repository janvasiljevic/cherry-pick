import {Controller, Get, Param, Request, UseGuards} from '@nestjs/common';
import {UserTypeGuard} from "../auth/guard/user-types.guard";
import {UserService} from "./user.service";
import {Roles} from "../common/decorators/roles.decorator";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {RequestWithUAT} from "../common/interfaces/tokens.interface";

@Controller('user')
@ApiTags('Users')
@UseGuards(UserTypeGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('')
    @ApiOperation({
        summary: 'Get all bids',
        description: 'Get all bids created by user, can be called by user or assistant'
    })
    getUserBids(@Request() {user}: RequestWithUAT) {
        return this.userService.getUserBids(user.sub, user.type);
    }
}


