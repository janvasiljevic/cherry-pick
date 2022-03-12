import { Test, TestingModule } from '@nestjs/testing';
import { BidService } from './bid.service';

describe('BidService', () => {
  let service: BidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BidService],
    }).compile();

    service = module.get<BidService>(BidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
