import {Injectable} from '@nestjs/common';
import {BidStatus, TypeOfProblem} from '@prisma/client';
import {PrismaService} from 'src/shared/prisma/prisma.service';
import {CreateBidDto, Order} from './dto/create-bid.dto';

@Injectable()
export class BidService {
    constructor(private prisma: PrismaService) {
    }

    async create(createBidDto: CreateBidDto, id: string) {
        return await this.prisma.bid.create({
            data: {...createBidDto, createdBy: {connect: {id}}},
            include: {createdBy: true},
        });
    }

    async signup(assistantId: string, bidId: string) {
        return await this.prisma.bid.update({
            where: {id: bidId},
            data: {
                assistedBy: {connect: {id: assistantId}},
                status: BidStatus.ASSIGNED,
            },
        });
    }

    async findAll(status: BidStatus, orderByDate: Order, typeOfProblemsBag: TypeOfProblem[]) {
        const where = {status};

        if (typeOfProblemsBag.length != 0) {
            where['typeOfProblem'] = {in: typeOfProblemsBag};
        }

        return await this.prisma.bid.findMany({
            include: {assistedBy: true, createdBy: true},
            where,
            orderBy: [
                {
                    createdAt: orderByDate,
                },
            ],
        });
    }

    async findOne(id: string) {
        return await this.prisma.bid.findUnique({where: {id}, include: {assistedBy: true, createdBy: true}});
    }

    async endBid(id: string) {
        const thisBid = await this.findOne(id)
        const assistant = await this.prisma.user.findUnique({where: {id: thisBid.assistedUserId}})
        await this.prisma.assistant.update({
            where: {id: assistant.assistantId},
            data: {
                numberOfHelps: {
                    increment: 1,
                },
                tips: {
                    increment: thisBid.tipAmount,
                },
            },
        });
        return await this.prisma.bid.update({
            where: {id},
            data: {
                status: BidStatus.CLOSED,
            },
        });
    }
}
