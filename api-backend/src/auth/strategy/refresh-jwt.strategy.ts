import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import * as bycrypt from 'bcrypt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { COOKIE_REFRESH_TOKEN } from 'src/common/constants/cookie.constants';
import { IRTPayload } from 'src/common/interfaces/tokens.interface';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor(private readonly configService: ConfigService, private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const extracted = request?.cookies[COOKIE_REFRESH_TOKEN];
          if (!extracted) throw new UnauthorizedException();

          const { valid, value } = request.unsignCookie(extracted);
          if (!valid) throw new UnauthorizedException();

          request.rawRefreshToken = value;

          return value;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_RT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: any, { sub }: IRTPayload) {
    const user = await this.usersService.getUserIfRefreshTokenMatches(request.rawRefreshToken, sub);

    return user;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    const isRefreshTokenMatching = bycrypt.compareSync(refreshToken, user.refreshToken);

    if (isRefreshTokenMatching) return user;
  }
}
