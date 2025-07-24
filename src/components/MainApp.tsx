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
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const navigate = useNavigate();
  
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts();
  const { items } = useCart();

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setIsCartDrawerOpen(false);
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentView('products');
  };

  const handleAdminToggle = () => {
    navigate('/admin');
  };

  const handleViewCart = () => {
    setCurrentView('cart');
    setIsCartDrawerOpen(false);
  };

  const handleCartDrawerToggle = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

  const selectedCategoryName = selectedCategory
    ? categories.find(cat => cat.id === selectedCategory)?.name || 'Catégorie'
    : 'Tous les produits';

  const renderContent = () => {
    switch (currentView) {
      case 'cart':
        return <Cart onViewChange={handleViewChange} />;
      case 'checkout':
        return <Checkout onViewChange={handleViewChange} />;
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
                    {selectedCategoryName}
                  </h1>
                  <p className="text-gray-600">
                    {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} disponible{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <ProductGrid
                  products={filteredProducts}
                  loading={productsLoading}
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
        onCartToggle={handleCartDrawerToggle}
        cartItemsCount={items.length}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {renderContent()}
      </div>

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        onViewCart={handleViewCart}
      />
    </div>
  );
}

export default MainApp;