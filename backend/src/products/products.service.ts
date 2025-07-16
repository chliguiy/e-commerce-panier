import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category'],
    });
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { category_id: categoryId },
      relations: ['category'],
    });
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  private async seedProducts() {
    const count = await this.productRepository.count();
    if (count === 0) {
      const products = [
        {
          name: 'Casque sans fil',
          description: 'Casque sans fil haute qualité avec réduction de bruit',
          price: 199.99,
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
          category_id: 1,
          stock: 25
        },
        {
          name: 'Montre connectée',
          description: 'Montre intelligente riche en fonctionnalités avec surveillance de la santé',
          price: 299.99,
          image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
          category_id: 1,
          stock: 15
        },
        {
          name: 'T-shirt design',
          description: 'T-shirt en coton premium avec design moderne',
          price: 49.99,
          image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
          category_id: 2,
          stock: 50
        },
        {
          name: 'Chaussures de course',
          description: 'Chaussures de course confortables pour tous terrains',
          price: 129.99,
          image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
          category_id: 4,
          stock: 30
        },
        {
          name: 'Cafetière',
          description: 'Cafetière automatique à filtre avec fonctions programmables',
          price: 89.99,
          image: 'https://images.pexels.com/photos/4226795/pexels-photo-4226795.jpeg?auto=compress&cs=tinysrgb&w=500',
          category_id: 3,
          stock: 20
        },
        {
          name: 'Livre de programmation',
          description: 'Guide complet du développement web moderne',
          price: 39.99,
          image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500',
          category_id: 5,
          stock: 100
        }
      ];

      for (const productData of products) {
        const product = this.productRepository.create(productData);
        await this.productRepository.save(product);
      }
      console.log('Products seeded successfully');
    }
  }
}