import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { TOKEN_PAYLOAD_NAME } from '../common/token-request';

export interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class TokenJwtGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const rq = context.switchToHttp().getRequest<Request>();

      const [type, token] = rq.headers.authorization?.split(' ') ?? [];

      if (type !== 'Bearer' || !token) {
        throw new HttpException(
          'Authentication scheme mismatch',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const secret = this.configService.get<string>('JWT_SECRET');

      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: secret,
      });

      if (payload) {
        rq[TOKEN_PAYLOAD_NAME] = payload;
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw new HttpException('token Rejected', HttpStatus.UNAUTHORIZED);
    }
  }
}
