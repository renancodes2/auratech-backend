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

  async findAllProducts() {
    const products = (await this.prisma.product.findMany()) ?? [];

    if (!products) {
      throw new HttpException('', HttpStatus.NOT_FOUND);
    }

    return products;
  }

  async findOneProduct(id: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new HttpException('', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async createProduct(file: Express.Multer.File, data: CreateProductDto) {
    let deleteImage: string | null = null;
    try {
      const createImage: UploadApiResponse =
        (await this.cloudinaryService.upload(file)) as UploadApiResponse;

      deleteImage = createImage.public_id;

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
      if (deleteImage) {
        await this.cloudinaryService.delete(deleteImage);
      }
      throw new HttpException(
        'Failed to create product',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
