import { Injectable } from '@nestjs/common';
import { Prisma, UserType } from '@prisma/client';
import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserBids(id: string, type: UserType) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { assistant: true, BidAssisted: true, BidCreated: true, Achievement: true },
    });
  }

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { assistant: true, BidAssisted: true, BidCreated: true, Achievement: true },
    });
  }
}
