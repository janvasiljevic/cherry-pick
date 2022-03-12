import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API } from 'src/common/constants/api.constants';
import { CreateAccountDto } from './dto/create-account.dto';
import { RegisterService } from './register.service';

@Controller(API.CONTROLLERS.REGISTER)
@ApiTags('Register')
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
