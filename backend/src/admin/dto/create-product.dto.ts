import { IsString, IsNumber, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsUrl()
  image: string;

  @IsNumber()
  category_id: number;

  @IsNumber()
  stock: number;
}