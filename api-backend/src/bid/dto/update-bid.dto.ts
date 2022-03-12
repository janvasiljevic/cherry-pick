import { PartialType } from '@nestjs/swagger';
import { CreateBidDto } from './create-bid.dto';

export class UpdateBidDto extends PartialType(CreateBidDto) {}
