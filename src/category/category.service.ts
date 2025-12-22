import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(data: createCategoryDto) {
    try {
      const create = await this.prisma.category.create({
        data: {
          name: data.name,
        },
      });

      return create;
    } catch (err) {
      throw new HttpException(
        'Failed to create category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
