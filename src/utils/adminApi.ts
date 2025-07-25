const API_BASE_URL = '';

export class AdminApiService {
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
      console.error('Admin API request failed:', error);
      throw error;
    }
  }

  // Categories
  static async getCategories() {
    return this.request<any[]>('/api/admin/categories');
  }

  static async createCategory(category: any) {
    return this.request('/api/admin/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
  }

  static async updateCategory(id: number, category: any) {
    return this.request(`/api/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
    });
  }

  static async deleteCategory(id: number) {
    return this.request(`/api/admin/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Products
  static async getProducts() {
    return this.request<any[]>('/api/admin/products');
  }

  static async createProduct(product: any) {
    return this.request('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  static async updateProduct(id: number, product: any) {
    return this.request(`/api/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  static async deleteProduct(id: number) {
    return this.request(`/api/admin/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Orders
  static async getOrders() {
    return this.request<any[]>('/api/admin/orders');
  }

  static async updateOrderStatus(id: number, status: string) {
    return this.request(`/api/admin/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Admin Users
  static async getAdminUsers() {
    return this.request<any[]>('/api/admin/users');
  }

  static async createAdminUser(user: any) {
    return this.request('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  }

  static async deleteAdminUser(id: number) {
    return this.request(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Dashboard Statistics
  static async getDashboardStats() {
    return this.request<any>('/api/admin/dashboard/stats');
  }
}