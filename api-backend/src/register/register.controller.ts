import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @ApiOperation({
    description: 'Register a new account',
    summary: 'Register a new account',
  })
  async register(@Body() createAccount: CreateAccountDto) {
    return this.registerService.register(createAccount);
  }
}
