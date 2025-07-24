import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories, useProducts } from '../hooks/useApi';
import { useCart } from '../contexts/CartContext';
import Header from './Header';
import CategorySidebar from './CategorySidebar';
import ProductGrid from './ProductGrid';
import Cart from './Cart';
import CartDrawer from './CartDrawer';
import Checkout from './Checkout';

type ViewType = 'products' | 'cart' | 'checkout';

function MainApp() {
  const [currentView, setCurrentView] = useState<ViewType>('products');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();
  const { state } = useCart();

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentView('products');
  };

  const handleAdminToggle = () => {
    navigate('/admin');
  };

  const handleCheckout = () => {
    setCurrentView('checkout');
  };

  const handleOrderComplete = () => {
    setCurrentView('products');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'cart':
        return <Cart onCheckout={handleCheckout} />;
      case 'checkout':
        return <Checkout onOrderComplete={handleOrderComplete} />;
      case 'products':
      default:
        return (
          <div className="flex flex-1 overflow-hidden">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              loading={categoriesLoading}
            />
            <main className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedCategory 
                      ? categories.find(cat => cat.id === selectedCategory)?.name || 'Catégorie'
                      : 'Tous les produits'
                    }
                  </h1>
                  <p className="text-gray-600">
                    Découvrez notre sélection de produits de qualité
                  </p>
                </div>
                <ProductGrid
                  products={products}
                  loading={productsLoading}
                  selectedCategory={selectedCategory}
                />
              </div>
            </main>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        currentView={currentView} 
        onViewChange={handleViewChange}
        onAdminToggle={handleAdminToggle}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {renderContent()}
      </div>

      <CartDrawer
        onCheckout={handleCheckout}
        onViewCart={() => handleViewChange('cart')}
      />
    </div>
  );
}

export default MainApp;