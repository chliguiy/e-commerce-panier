import { IsString, IsEmail, IsArray, IsNumber, IsOptional, ValidateNested, Transform } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;
}

export class OrderItemDto {
  @IsNumber()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const num = parseFloat(value);
      return isNaN(num) ? value : num;
    }
    return value;
  })
  product_id: number;

  @IsNumber()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const num = parseInt(value, 10);
      return isNaN(num) ? value : num;
    }
    return value;
  })
  quantity: number;

  @IsNumber()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const num = parseFloat(value);
      return isNaN(num) ? value : num;
    }
    return value;
  })
  price: number;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const num = parseFloat(value);
      return isNaN(num) ? value : num;
    }
    return value;
  })
  total: number;

  @IsOptional()
  @IsString()
  paymentMethod?: string;
}