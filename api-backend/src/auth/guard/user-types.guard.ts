import { Injectable, CanActivate, ExecutionContext, BadRequestException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserType } from '@prisma/client';
import { API } from 'src/common/constants/api.constants';
import { ExtractedUAT } from 'src/common/interfaces/tokens.interface';

@Injectable()
export class UserTypeGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  private logger = new Logger(UserTypeGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First we let passport.js to extract the Cookie and authenticate the user
    // It also adds an "user" property to the request. Check "jwt.strategy.ts" for further info
    await super.canActivate(context);

    // We get what role we actually require to authorize. Can be 'user' or 'assistant'
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles == undefined) {
      return true;
    }

    // Extract the club ID the request is ment for
    const request = context.switchToHttp().getRequest();

    // Remember: .user was added by super.canActivate (Passport strategy)
    const { type }: ExtractedUAT = request.user;

    return requiredRoles.includes(type);
  }
}
