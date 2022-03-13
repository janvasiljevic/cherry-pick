import {Injectable} from '@nestjs/common';
import {BidStatus, Prisma, UserType} from '@prisma/client';
import {PrismaService} from '../shared/prisma/prisma.service';
import axios from "axios";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {
    }

    async getUserBids(id: string, type: UserType) {
        return await this.prisma.user.findUnique({
            where: {id},
            include: {assistant: true, BidAssisted: true, BidCreated: true, Achievement: true},
        });
    }

    async getUserById(id: string) {
        return await this.prisma.user.findUnique({
            where: {id},
            include: {assistant: true, BidAssisted: true, BidCreated: true, Achievement: true},
        });
    }

    async addWalletAddress(address: string, id: string) {
        await this.prisma.user.update({
            where: {id},
            data: {
                assistant: {
                    update: {
                        wallet: address
                    }
                }
            }
        })

        const response = await axios.post('http://nft:4000/create-nft', {
            contract_name: 'Signup',
            address: address,
            contract_address: '0x03a348BA542b59F9243892EAd692E497601cE7A5',
        });

        return await this.prisma.user.update({
            where: {id},
            data: {
                assistant: {
                    update: {
                        achievement: {
                            push: ["SignUp"]
                        }
                    }
                }
            }
        })
    }
}
