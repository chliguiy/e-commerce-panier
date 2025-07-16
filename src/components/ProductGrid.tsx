import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Package } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  selectedCategory: number | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, selectedCategory }) => {
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category_id === selectedCategory)
    : products;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <Package className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
        <p className="text-gray-500 text-center max-w-md">
          {selectedCategory 
            ? "Aucun produit disponible dans cette catégorie. Essayez de sélectionner une autre catégorie."
            : "Aucun produit n'est actuellement disponible."
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;