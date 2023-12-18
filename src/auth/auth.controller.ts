import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/dto.signup';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DtoAuthResponse } from './dto/dtoAuthResponse';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiOperation({ summary: 'Signing in using email and password' })
  @ApiOkResponse({ type: DtoAuthResponse })
  @ApiBody({ type: SignInDto })
  @Post('signin')
  async signin(@Body() dto: SignInDto) {
    return this.service.signin(dto);
  }

  @ApiOperation({ summary: 'Signing up using email and password' })
  @ApiOkResponse({ type: DtoAuthResponse })
  @ApiBody({ type: SignUpDto })
  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    return this.service.signup(dto);
  }
}
