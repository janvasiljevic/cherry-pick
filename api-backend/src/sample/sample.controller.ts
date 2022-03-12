import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SampleService } from './sample.service';

@Controller('sample')
@ApiTags('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get('user')
  async getUsers() {
    return await this.sampleService.getUsers();
  }

  @Post('user/:username')
  async createUser(@Param('username') username: string) {
    return await this.sampleService.createUser(username);
  }
}
