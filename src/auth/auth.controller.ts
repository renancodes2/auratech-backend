import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenJwtGuard } from './guard/token-jwt.guard';
import { TokenPayloadParam } from './param/token-payload-param';
import { TokenPaylodDto } from './dto/token-payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() data: CreateUserDto) {
    return this.authService.createUser(data);
  }

  @UseGuards(TokenJwtGuard)
  @Get('/session')
  getSession(@TokenPayloadParam() token: TokenPaylodDto) {
    return this.authService.getSession(token);
  }
}
