import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import { useCategories, useProducts } from './hooks/useApi';
import Header from './components/Header';
import CategorySidebar from './components/CategorySidebar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CartDrawer from './components/CartDrawer';

type ViewType = 'products' | 'cart' | 'checkout';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('products');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleCheckout = () => {
    setCurrentView('checkout');
  };

  const handleOrderComplete = () => {
    setCurrentView('products');
  };

  const handleViewCart = () => {
    setCurrentView('cart');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'cart':
        return <Cart onCheckout={handleCheckout} />;
      
      case 'checkout':
        return <Checkout onOrderComplete={handleOrderComplete} />;
      
      default:
        return (
          <div className="flex">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              loading={categoriesLoading}
            />
            <div className="flex-1 p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory 
                    ? categories.find(c => c.id === selectedCategory)?.name || 'Produits'
                    : 'Tous les produits'
                  }
                </h1>
                <p className="text-gray-600">
                  Découvrez notre sélection premium de produits
                </p>
              </div>
              <ProductGrid
                products={products}
                loading={productsLoading}
                selectedCategory={selectedCategory}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={handleViewChange} />
      <main className="pb-8">
        {renderContent()}
      </main>
      <CartDrawer onCheckout={handleCheckout} onViewCart={handleViewCart} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;