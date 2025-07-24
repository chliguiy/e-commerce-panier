import { IsEnum } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsEnum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}