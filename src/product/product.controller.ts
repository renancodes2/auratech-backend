import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateProductDto,
  ) {
    return this.productService.createProduct(file, data);
  }
}
