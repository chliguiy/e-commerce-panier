import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminUser } from './entities/admin-user.entity';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser]),
    ProductsModule,
    CategoriesModule,
    OrdersModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}