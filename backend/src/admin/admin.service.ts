import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectRepository(AdminUser)
    private adminUserRepository: Repository<AdminUser>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async onModuleInit() {
    await this.seedAdminUsers();
  }

  async findByUsername(username: string) {
    return await this.adminUserRepository.findOne({
      where: [
        { username },
        { email: username }
      ]
    });
  }

  // Categories
  async getCategories() {
    return await this.categoryRepository.find();
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async updateCategory(id: number, updateCategoryDto: CreateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto);
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async deleteCategory(id: number) {
    await this.categoryRepository.delete(id);
    return { success: true };
  }

  // Products
  async getProducts() {
    return await this.productRepository.find({
      relations: ['category'],
    });
  }

  async createProduct(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async updateProduct(id: number, updateProductDto: CreateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    return await this.productRepository.findOne({ 
      where: { id },
      relations: ['category']
    });
  }

  async deleteProduct(id: number) {
    await this.productRepository.delete(id);
    return { success: true };
  }

  // Orders
  async getOrders() {
    return await this.orderRepository.find({
      relations: ['items', 'items.product'],
      order: { created_at: 'DESC' },
    });
  }

  async updateOrderStatus(id: number, status: string) {
    await this.orderRepository.update(id, { status });
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
  }

  // Admin Users
  async getAdminUsers() {
    return await this.adminUserRepository.find({
      select: ['id', 'username', 'email', 'role', 'created_at', 'updated_at'],
    });
  }

  async createAdminUser(createAdminUserDto: CreateAdminUserDto) {
    const hashedPassword = await bcrypt.hash(createAdminUserDto.password, 10);
    const adminUser = this.adminUserRepository.create({
      ...createAdminUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.adminUserRepository.save(adminUser);
    
    // Return without password
    const { password, ...result } = savedUser;
    return result;
  }

  async deleteAdminUser(id: number) {
    await this.adminUserRepository.delete(id);
    return { success: true };
  }

  // Dashboard Statistics
  async getDashboardStats() {
    const [products, categories, orders] = await Promise.all([
      this.productRepository.find(),
      this.categoryRepository.find(),
      this.orderRepository.find({ relations: ['items'] })
    ]);

    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total.toString()), 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length;
    const confirmedOrders = orders.filter(order => order.status === 'confirmed').length;
    const shippedOrders = orders.filter(order => order.status === 'shipped').length;
    const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;

    return {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalOrders: orders.length,
      totalRevenue,
      ordersByStatus: {
        pending: pendingOrders,
        confirmed: confirmedOrders,
        shipped: shippedOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders
      },
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
      recentOrders: orders
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
    };
  }

  private async seedAdminUsers() {
    const count = await this.adminUserRepository.count();
    if (count === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = this.adminUserRepository.create({
        username: 'admin',
        email: 'admin@boutiquefr.com',
        password: hashedPassword,
        role: 'super_admin',
      });
      await this.adminUserRepository.save(adminUser);
      console.log('Default admin user created: admin@boutiquefr.com / admin123');
    }
  }
}