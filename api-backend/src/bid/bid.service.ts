import { Injectable } from '@nestjs/common';
import { BidStatus, TypeOfProblem } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateBidDto, Order } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';

@Injectable()
export class BidService {
  constructor(private prisma: PrismaService) {}

  async create(createBidDto: CreateBidDto, id: string) {
    return await this.prisma.bid.create({
      data: { ...createBidDto, createdBy: { connect: { id } } },
      include: { createdBy: true },
    });
  }

  async signup(assistantId: string, bidId: string) {
    return await this.prisma.bid.update({
      where: { id: bidId },
      data: {
        assistedBy: { connect: { id: assistantId } },
        status: BidStatus.ASSIGNED,
      },
    });
  }

  async findAll(status: BidStatus, orderByDate: Order, typeOfProblemsBag: TypeOfProblem[]) {
    const where = { status };

    if (typeOfProblemsBag.length != 0) {
      where['typeOfProblem'] = { in: typeOfProblemsBag };
    }

    return await this.prisma.bid.findMany({
      include: { assistedBy: true, createdBy: true },
      where,
      orderBy: [
        {
          createdAt: orderByDate,
        },
      ],
    });
  }

  async findOne(id: string) {
    return await this.prisma.bid.findUnique({ where: { id }, include: { assistedBy: true, createdBy: true } });
  }

  update(id: number, updateBidDto: UpdateBidDto) {
    return `This action updates a #${id} bid`;
  }

  remove(id: number) {
    return `This action removes a #${id} bid`;
  }
}
