import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    await this.seedCategories();
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  private async seedCategories() {
    const count = await this.categoryRepository.count();
    if (count === 0) {
      const categories = [
        { name: 'Électronique', description: 'Derniers gadgets et appareils' },
        { name: 'Vêtements', description: 'Mode et habillement' },
        { name: 'Maison & Jardin', description: 'Amélioration et décoration de la maison' },
        { name: 'Sport', description: 'Équipements de sport et de plein air' },
        { name: 'Livres', description: 'Livres et matériel éducatif' },
      ];

      for (const categoryData of categories) {
        const category = this.categoryRepository.create(categoryData);
        await this.categoryRepository.save(category);
      }
      console.log('Categories seeded successfully');
    }
  }
}