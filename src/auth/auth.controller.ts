import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/index';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/dto.signup';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signin')
  async signin(@Body() dto: SignInDto) {
    return this.service.signin(dto);
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    return this.service.signup(dto);
  }
}
