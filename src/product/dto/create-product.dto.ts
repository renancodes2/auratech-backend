import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, isString, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @Type(() => Number)
  @IsInt()
  price: number;
  @Type(() => Number)
  @IsInt()
  stock: number;
  @IsString()
  categoryId: string;
}
