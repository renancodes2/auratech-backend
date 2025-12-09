import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { HashingProtocol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenJwtGuard } from './guard/token-jwt.guard';

@Global()
@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashingProtocol,
      useClass: BcryptService,
    },
    AuthService,
    TokenJwtGuard,
  ],
  exports: [HashingProtocol, TokenJwtGuard, JwtModule],
})
export class AuthModule {}
