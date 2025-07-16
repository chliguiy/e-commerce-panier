import React from 'react';
import { Category } from '../types';
import { Filter, Grid } from 'lucide-react';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
  loading: boolean;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  loading
}) => {
  if (loading) {
    return (
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Catégories</h2>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
            selectedCategory === null
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Grid className="h-4 w-4" />
          <span className="font-medium">Tous les produits</span>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div>
              <p className="font-medium">{category.name}</p>
              {category.description && (
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;