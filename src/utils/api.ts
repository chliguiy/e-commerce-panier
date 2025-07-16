const API_BASE_URL = 'http://localhost:8080'; // Change this to your servlet URL

export class ApiService {
  private static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed, falling back to mock data:', error);
      // Fall back to mock data when backend is not available
      return this.getMockData<T>(endpoint, options);
    }
  }

  private static getMockData<T>(endpoint: string, options?: RequestInit): T {
    if (endpoint === '/api/categories') {
      return mockCategories as T;
    } else if (endpoint === '/api/products') {
      return mockProducts as T;
    } else if (endpoint === '/api/orders' && options?.method === 'POST') {
      // Simulate successful order submission
      return { success: true, orderId: Math.random().toString(36).substr(2, 9) } as T;
    }
    throw new Error(`No mock data available for endpoint: ${endpoint}`);
  }

  static async getCategories() {
    return this.request<any[]>('/api/categories');
  }

  static async getProducts() {
    return this.request<any[]>('/api/products');
  }

  static async submitOrder(order: any) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }
}

// Mock data for development - remove when connecting to real backend
export const mockCategories = [
  { id: 1, name: 'Électronique', description: 'Derniers gadgets et appareils' },
  { id: 2, name: 'Vêtements', description: 'Mode et habillement' },
  { id: 3, name: 'Maison & Jardin', description: 'Amélioration et décoration de la maison' },
  { id: 4, name: 'Sport', description: 'Équipements de sport et de plein air' },
  { id: 5, name: 'Livres', description: 'Livres et matériel éducatif' },
];

export const mockProducts = [
  {
    id: 1,
    name: 'Casque sans fil',
    description: 'Casque sans fil haute qualité avec réduction de bruit',
    price: 199.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category_id: 1,
    stock: 25
  },
  {
    id: 2,
    name: 'Montre connectée',
    description: 'Montre intelligente riche en fonctionnalités avec surveillance de la santé',
    price: 299.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category_id: 1,
    stock: 15
  },
  {
    id: 3,
    name: 'T-shirt design',
    description: 'T-shirt en coton premium avec design moderne',
    price: 49.99,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
    category_id: 2,
    stock: 50
  },
  {
    id: 4,
    name: 'Chaussures de course',
    description: 'Chaussures de course confortables pour tous terrains',
    price: 129.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    category_id: 4,
    stock: 30
  },
  {
    id: 5,
    name: 'Cafetière',
    description: 'Cafetière automatique à filtre avec fonctions programmables',
    price: 89.99,
    image: 'https://images.pexels.com/photos/4226795/pexels-photo-4226795.jpeg?auto=compress&cs=tinysrgb&w=500',
    category_id: 3,
    stock: 20
  },
  {
    id: 6,
    name: 'Livre de programmation',
    description: 'Guide complet du développement web moderne',
    price: 39.99,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500',
    category_id: 5,
    stock: 100
  }
];