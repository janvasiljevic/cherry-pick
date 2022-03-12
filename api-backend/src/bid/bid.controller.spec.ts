import { Test, TestingModule } from '@nestjs/testing';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';

describe('BidController', () => {
  let controller: BidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BidController],
      providers: [BidService],
    }).compile();

    controller = module.get<BidController>(BidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
