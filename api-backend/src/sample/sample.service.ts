import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class SampleService {
  constructor(private prismaService: PrismaService) {}

  public async getUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }
}
