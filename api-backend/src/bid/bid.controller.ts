import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BidStatus, TypeOfProblem } from '@prisma/client';
import { UserTypeGuard } from 'src/auth/guard/user-types.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RequestWithUAT } from 'src/common/interfaces/tokens.interface';
import { BidService } from './bid.service';
import { CreateBidDto, Order } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';

@Controller('bid')
@ApiTags('Bids')
@UseGuards(UserTypeGuard)
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post()
  @Roles('USER')
  @ApiOperation({ summary: 'Create a bid', description: 'Can only be called by a normal user, not an assiant' })
  create(@Body() createBidDto: CreateBidDto, @Request() { user }: RequestWithUAT) {
    return this.bidService.create(createBidDto, user.sub);
  }

  @Get(':id/signup')
  @Roles('ASSISTANT')
  @ApiOperation({
    summary: 'Sign up to a bid',
    description: 'Can only be called by a ASSISTANT, not a USER. Signs up to a bid',
  })
  signup(@Request() { user }: RequestWithUAT, @Param('id') id: string) {
    return this.bidService.signup(user.sub, id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all the bids',
    description: 'Get all the bids',
  })
  @ApiQuery({ name: 'status', enum: BidStatus, example: BidStatus.OPEN, required: false })
  @ApiQuery({ name: 'dateOrder', enum: Order, example: Order.DESC, required: false })
  @ApiQuery({
    name: 'typeOfProblem',
    enum: TypeOfProblem,
    isArray: true,
    example: [TypeOfProblem.OTHER],
    required: false,
    description: `If empty, all will be selected. Possible array values: ${Object.keys(TypeOfProblem)}`,
  })
  findAll(
    @Query('status') status: BidStatus = BidStatus.OPEN,
    @Query('dateOrder') orderByDate: Order = Order.DESC,
    @Query('typeOfProblem') typeOfProblem: TypeOfProblem[] = [],
  ) {
    return this.bidService.findAll(status, orderByDate, typeOfProblem);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one bid',
    description: 'Get one bid',
  })
  findOne(@Param('id') id: string) {
    return this.bidService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
    return this.bidService.update(+id, updateBidDto);
  }
}
