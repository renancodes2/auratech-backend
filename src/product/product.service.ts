import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async createProduct(file: Express.Multer.File, data: CreateProductDto) {
    try {
      const createImage: UploadApiResponse =
        (await this.cloudinaryService.upload(file)) as UploadApiResponse;

      if (!createImage) return;

      const create = await this.prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          price: Number(data.price),
          stock: Number(data.stock),
          categoryId: data.categoryId,
          images: [createImage.secure_url],
        },
      });

      if (!create) {
        throw new HttpException('', HttpStatus.BAD_REQUEST);
      }

      return create;
    } catch (err) {
      throw new HttpException(
        'Failed to create product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
