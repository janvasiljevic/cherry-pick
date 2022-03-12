import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';

@Module({
  controllers: [BidController],
  providers: [BidService]
})
export class BidModule {}
