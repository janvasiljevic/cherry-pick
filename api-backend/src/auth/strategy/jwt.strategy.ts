import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { COOKIE_JWT_ACCESS_TOKEN } from 'src/common/constants/cookie.constants';
import { ExtractedUAT, IUAT } from 'src/common/interfaces/tokens.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          const extracted = request?.cookies[COOKIE_JWT_ACCESS_TOKEN];
          if (!extracted) throw new UnauthorizedException();

          const { valid, value } = request.unsignCookie(extracted);
          if (!valid) throw new UnauthorizedException();

          return value;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_UAT_SECRET'),
    });
  }

  async validate(payload: IUAT): Promise<ExtractedUAT> {
    return { email: payload.email, type: payload.type, sub: payload.sub };
  }
}
