import React from 'react';
import { ShoppingCart, Store, Settings } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  currentView: 'products' | 'cart' | 'checkout';
  onViewChange: (view: 'products' | 'cart' | 'checkout') => void;
  onAdminToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, onAdminToggle }) => {
  const { getTotalItems, toggleCart } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onViewChange('products')}
          >
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BoutiqueFR</h1>
              <p className="text-xs text-gray-500">Marketplace Premium</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onViewChange('products')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'products'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Produits
            </button>
            {totalItems > 0 && (
              <button
                onClick={() => onViewChange('cart')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'cart'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Panier
              </button>
            )}
          </nav>

          {/* Cart Button */}
          <div className="flex items-center space-x-2">
            {onAdminToggle && (
              <button
                onClick={onAdminToggle}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title="Mode Admin"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
          >
            <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;