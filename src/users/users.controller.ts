import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenJwtGuard } from 'src/auth/guard/token-jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @UseGuards(TokenJwtGuard)
  @Get()
  findAllUsers() {
    return this.usersServices.findAllUsers();
  }
  @Post()
  createUser(@Body() data: CreateUserDto) {
    return this.usersServices.createOneUser(data);
  }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('upload-image')
  // async uploadProductImage(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new Error('No image file was provided.');
  //   }
  //   return {
  //     imageUrl: result.secure_url,
  //     publicId: result.public_id,
  //   };
  // }
}
