import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';
import { ExtractedUAT, IRTPayload, IUATPayload } from 'src/common/interfaces/tokens.interface';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, private configService: ConfigService) {}

  private readonly rtExpire = this.configService.get('REFRESH_TOKEN_LIFESPAN');
  private readonly rtSecret = this.configService.get('JWT_RT_SECRET');

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && bycrypt.compareSync(pass, user.password)) return user;

    return null;
  }

  async login(user: User) {
    const accessToken = this.generateUAT(user);
    const refreshToken = await this.generateRT(user);

    const { password, updatedAt, ...profile } = user;

    return {
      profile,
      accessToken,
      refreshToken,
    };
  }

  generateUAT(user: User) {
    const uatPayload: IUATPayload = {
      email: user.email,
      sub: user.id,
      type: user.userType,
    };

    return this.jwtService.sign(uatPayload);
  }

  async generateRT(user: User) {
    const rtPayload: IRTPayload = {
      sub: user.id,
      type: user.userType,
    };

    const refreshToken = this.jwtService.sign(rtPayload, {
      secret: this.rtSecret,
      expiresIn: this.rtExpire,
    });

    const hashedRefreshToken = await bycrypt.hash(refreshToken, 10);

    await this.updateRefreshToken(user.id, hashedRefreshToken);

    return refreshToken;
  }

  async deleteRefreshToken({ sub }: ExtractedUAT) {
    await this.updateRefreshToken(sub, null);
  }

  async updateRefreshToken(id: string, refreshToken: string | null) {
    return this.prisma.user.update({ where: { id }, data: { refreshToken } });
  }
}
