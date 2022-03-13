import {ApiProperty} from "@nestjs/swagger";
import {TypeOfProblem} from "@prisma/client";
import {IsEnum} from "class-validator";


export class CreateAchievementDto {
    @ApiProperty({ example: 'Good Samaritan' })
    name: string;

    @ApiProperty({ example: 1 })
    level: number;

    @ApiProperty({ example: 'Lorem ipsum' })
    description: string;
}

export enum Order {
    ASC = 'asc',
    DESC = 'desc',
}