export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  stock: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

export interface CreateAdminUserDto {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'super_admin';
}