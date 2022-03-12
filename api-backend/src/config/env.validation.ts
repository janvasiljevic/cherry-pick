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

  @IsNumber()
  REDIS_DATABASE_ID: number = 1;

  @IsString()
  REDIS_HOSTNAME: string = 'redis';

  @IsNumber()
  REDIS_PORT: number = 6379;

  @IsString()
  REDIS_PASS: string = 'redis-pass';
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
