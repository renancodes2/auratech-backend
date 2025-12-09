import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response.interface';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async createProduct(file: Express.Multer.File, data: CreateProductDto) {
    try {
      if (!file || !file.mimetype.startsWith('image/')) {
        throw new HttpException(
          'File must be an image.',
          HttpStatus.BAD_REQUEST,
        );
      }
      const urlPublic: CloudinaryResponse =
        await this.cloudinaryService.uploadFile(file);

      console.log(urlPublic);
      const create = await this.prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          categoryId: data.categoryId,
          images: [urlPublic.secure_url],
        },
      });

      return create;
    } catch (err) {
      throw new HttpException(
        'Failed to create product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
