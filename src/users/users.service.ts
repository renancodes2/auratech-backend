import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private hashingService: HashingProtocol,
  ) {}

  async createOneUser(data: CreateUserDto) {
    const passwordHash = await this.hashingService.createHash(data.password);
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new HttpException(
        'This user already has an account',
        HttpStatus.BAD_REQUEST,
      );
    }
    const create = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return create;
  }

  async findAllUsers() {
    const users = await this.prisma.user.findMany();

    return users;
  }
}
