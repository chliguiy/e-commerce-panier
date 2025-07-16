import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: number) {
    return await this.productsService.findByCategory(categoryId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.productsService.findOne(id);
  }
}