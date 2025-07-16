export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  customer: Customer;
  items: {
    product_id: number;
    quantity: number;
    price: number;
  }[];
  total: number;
  paymentMethod?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}