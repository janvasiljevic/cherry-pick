import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, validateSync, IsString } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  HTTP_PORT: number = 8080;

  @IsString()
  HTTP_API_PREFIX: string = 'v2/api/';

  @IsString()
  HTTP_SWAGGER_DOCS_PREFIX: string = '/api/docs/';

  @IsString()
  JWT_UAT_SECRET: string;

  @IsNumber()
  ACCESS_TOKEN_LIFESPAN: number;

  @IsString()
  JWT_RT_SECRET: string;

  @IsNumber()
  REFRESH_TOKEN_LIFESPAN: number;

  @IsString()
  COOKIE_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
