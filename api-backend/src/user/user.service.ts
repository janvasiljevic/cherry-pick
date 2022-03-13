import { Injectable } from '@nestjs/common';
import {Prisma, UserType} from "@prisma/client";
import {PrismaService} from "../shared/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUserBids(id: string, type: UserType) {
        if (type == UserType.USER) {
            return await this.prisma.bid.findMany({
                where: {createdUserId: id}
            });
        }
        if (type == UserType.ASSISTANT) {
            return await this.prisma.bid.findMany({
                where: {assistedUserId: id}
            })
        }
    }
}
