import { useState, useEffect } from 'react';
import { ApiService, mockCategories, mockProducts } from '../utils/api';
import { Category, Product } from '../types';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Try to fetch from API, fallback to mock data
        try {
          const data = await ApiService.getCategories();
          setCategories(data);
        } catch (apiError) {
          console.warn('Using mock data for categories');
          setCategories(mockCategories);
        }
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Try to fetch from API, fallback to mock data
        try {
          const data = await ApiService.getProducts();
          setProducts(data);
        } catch (apiError) {
          console.warn('Using mock data for products');
          setProducts(mockProducts);
        }
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};