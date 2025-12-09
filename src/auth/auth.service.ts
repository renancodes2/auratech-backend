import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingProtocol } from './hash/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPaylodDto } from './dto/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingProtocol,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(data: CreateUserDto) {
    try {
      const { email, password } = data;

      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      const compareHash = await this.hashingService.compareHash(
        password,
        user?.password,
      );

      if (!compareHash) {
        throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
      }

      const payload = {
        sub: user.id,
        email: user.email,
      };

      const token = await this.jwtService.signAsync(payload);

      if (!token) {
        throw new HttpException(
          'Error generating token',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        name: user.name,
        email: user.email,
        token,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'An unexpected error occurred during login',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getSession(token: TokenPaylodDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: token.sub,
        },
        select: {
          name: true,
          email: true,
        },
      });

      return user;
    } catch (err) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
