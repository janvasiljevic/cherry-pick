import { Controller, Request, Post, UseGuards, HttpCode, Get, Res, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody, ApiBearerAuth, ApiCookieAuth } from '@nestjs/swagger';
import { LoginUserLocalDto } from './dto/local.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { FastifyReply } from 'fastify';
import { COOKIE_JWT_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from 'src/common/constants/cookie.constants';
import { ConfigService } from '@nestjs/config';
import { RequestWithUAT, RequestWithUser } from 'src/common/interfaces/tokens.interface';
import { API } from 'src/common/constants/api.constants';
import JwtRefreshGuard from './guard/jwt-refresh.guard';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Controller(API.CONTROLLERS.AUTH)
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService, private prisma: PrismaService) {}

  private logger = new Logger(AuthController.name);

  private readonly refreshTokenTTL = this.configService.get('REFRESH_TOKEN_LIFESPAN');
  private readonly accessTokenTTL = this.configService.get('ACCESS_TOKEN_LIFESPAN');
  private readonly refreshTokenPath = `${this.configService.get('HTTP_API_PREFIX')}${API.CONTROLLERS.AUTH}/${
    API.AUTH.REFRESH
  }`;

  @UseGuards(LocalAuthGuard)
  @Post(`${API.AUTH.LOGIN}`)
  @HttpCode(200)
  @ApiBody({ type: LoginUserLocalDto })
  @ApiOperation({ summary: 'Logins the user', description: 'Logins the user and returns the user object' })
  @ApiOkResponse({
    description: `Returns the logged in user and sets two cookies (\`${COOKIE_JWT_ACCESS_TOKEN}\` (Time ) and \`${COOKIE_REFRESH_TOKEN}\`) which are required for the authentication system. Check the .env file for token lifespans.`,
  })
  async login(@Request() { user }, @Res({ passthrough: true }) response: FastifyReply) {
    const { profile, accessToken, refreshToken } = await this.authService.login(user);

    response.setCookie(COOKIE_JWT_ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      maxAge: this.accessTokenTTL,
      path: '/',
      signed: true,
    });

    response.setCookie(COOKIE_REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      maxAge: this.refreshTokenTTL,
      path: this.refreshTokenPath,
      signed: true,
    });

    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Get(`${API.AUTH.PROFILE}`)
  @ApiCookieAuth()
  async getProfile(@Request() { user }: RequestWithUAT) {
    console.log(user);

    this.logger.debug(`${user.email} has requested his profile.`);

    const { refreshToken, password, ...data } = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
      include: {
        assistant: true
      }
    });

    return data;
  }

  @UseGuards(JwtRefreshGuard)
  @Get(`${API.AUTH.REFRESH}`)
  @ApiCookieAuth()
  async refreshToken(@Request() { user }: RequestWithUser, @Res({ passthrough: true }) response: FastifyReply) {
    const accessToken = this.authService.generateUAT(user);
    const refreshToken = await this.authService.generateRT(user);

    this.logger.debug(`Refreshing RT and UAT for ${user.email}`);

    response.setCookie(COOKIE_JWT_ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      maxAge: this.accessTokenTTL,
      path: '/',
      signed: true,
    });

    response.setCookie(COOKIE_REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      maxAge: this.refreshTokenTTL,
      path: this.refreshTokenPath,
      signed: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(`${API.AUTH.LOGOUT}`)
  @ApiCookieAuth()
  async logout(@Request() { user }: RequestWithUAT, @Res({ passthrough: true }) response: FastifyReply) {
    this.logger.debug(`Logging out user ${user.email}`);

    await this.authService.deleteRefreshToken(user);

    response.clearCookie(COOKIE_JWT_ACCESS_TOKEN);
    response.clearCookie(COOKIE_REFRESH_TOKEN, {
      path: this.refreshTokenPath,
    });
  }
}
