import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { customer, items, total, paymentMethod } = createOrderDto;

    // Create order
    const order = this.orderRepository.create({
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      customer_address: customer.address,
      total,
      payment_method: paymentMethod,
      status: 'pending',
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    const orderItems = items.map(item => 
      this.orderItemRepository.create({
        order_id: savedOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })
    );

    await this.orderItemRepository.save(orderItems);

    // Return order with items
    return await this.findOne(savedOrder.id);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['items', 'items.product'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });
  }
}