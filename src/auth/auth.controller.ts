import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sign-in.dto';
import { TokenJwtGuard } from './guard/token-jwt.guard';
import { TokenPayloadParam } from './param/token-payload-param';
import { TokenPaylodDto } from './dto/token-payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() data: signInDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(TokenJwtGuard)
  @Get('/session')
  getSession(@TokenPayloadParam() token: TokenPaylodDto) {
    return this.authService.getSession(token);
  }
}
