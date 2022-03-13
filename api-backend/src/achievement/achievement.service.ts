import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

@Injectable()
export class AchievementService {
  constructor(private prisma: PrismaService, private httpService: HttpService) {}

  async create(createAchievementDto: CreateAchievementDto, id: string) {
    const response = await this.httpService
      .post('http://localhost:3001/create-contract', {
        name: createAchievementDto.name + '_' + createAchievementDto.level,
        symbol: createAchievementDto.name + createAchievementDto.level,
        base_uri: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      })
      .toPromise();

    await this.prisma.achievement.create({
      data: {
        ...createAchievementDto,
        contractName: createAchievementDto.name + '_' + createAchievementDto.level,
        contractAddress: response.data.data,
        createdBy: { connect: { id } },
      },
    });
  }
}
