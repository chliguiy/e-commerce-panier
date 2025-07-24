import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Categories
  @Get('categories')
  async getCategories() {
    return await this.adminService.getCategories();
  }

  @Post('categories')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.adminService.createCategory(createCategoryDto);
  }

  @Put('categories/:id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: CreateCategoryDto
  ) {
    return await this.adminService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deleteCategory(id);
  }

  // Products
  @Get('products')
  async getProducts() {
    return await this.adminService.getProducts();
  }

  @Post('products')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.adminService.createProduct(createProductDto);
  }

  @Put('products/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: CreateProductDto
  ) {
    return await this.adminService.updateProduct(id, updateProductDto);
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deleteProduct(id);
  }

  // Orders
  @Get('orders')
  async getOrders() {
    return await this.adminService.getOrders();
  }

  @Put('orders/:id/status')
  async updateOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto
  ) {
    return await this.adminService.updateOrderStatus(id, updateOrderStatusDto.status);
  }

  // Admin Users
  @Get('users')
  async getAdminUsers() {
    return await this.adminService.getAdminUsers();
  }

  @Post('users')
  async createAdminUser(@Body() createAdminUserDto: CreateAdminUserDto) {
    return await this.adminService.createAdminUser(createAdminUserDto);
  }

  @Delete('users/:id')
  async deleteAdminUser(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deleteAdminUser(id);
  }
}