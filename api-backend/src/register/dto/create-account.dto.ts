import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email', example: 'vasiljevic.jan@gmail.com', required: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: 'Account password', example: '12345678', required: true })
  password: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  @ApiProperty({ enum: UserType })
  userType: UserType;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(2022)
  @ApiProperty({ example: 2000, required: true })
  yearOfBirth: number;

  @IsNotEmpty()
  @Length(5, 10)
  @ApiProperty({ example: '068132807', required: true })
  telephoneNumber: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 3.14, required: false })
  longitude?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 3.14, required: false })
  latitude?: number;
}
