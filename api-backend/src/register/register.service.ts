import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class RegisterService {
  constructor(private prisma: PrismaService) {}

  async register(createAccount: CreateAccountDto) {
    const password = await bcrypt.hash(createAccount.password, 10);

    if (createAccount.userType == UserType.USER) {
      return await this.prisma.user.create({ data: { ...createAccount, password } }).catch((e) => {
        console.log(e);

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') throw new ConflictException('User with this email already exists');
        }
        throw new InternalServerErrorException();
      });
    } else if (createAccount.userType == UserType.ASSISTANT) {
      return await this.prisma.user
        .create({
          data: {
            ...createAccount,
            password,
            assistant: {
              create: {
                numberOfHelps: 0,
              },
            },
          },
        })
        .catch((e) => {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') throw new ConflictException('User with this email already exists');
          }
          throw new InternalServerErrorException();
        });
    }

    throw new BadRequestException();
  }
}
