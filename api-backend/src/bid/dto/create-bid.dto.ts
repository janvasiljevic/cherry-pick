import { ApiProperty } from '@nestjs/swagger';
import { Bid, TypeOfProblem } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class CreateBidDto {
  @ApiProperty({ enum: TypeOfProblem })
  @IsEnum(TypeOfProblem)
  typeOfProblem: TypeOfProblem;

  @ApiProperty({ example: 500 })
  tipAmount: number;

  @ApiProperty({ example: 'Lorem ipsum' })
  description: string;
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
