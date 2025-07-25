import React from 'react';
import { useCart } from '../contexts/CartContext';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  onCheckout: () => void;
  onViewCart: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onViewCart }) => {
  const { state, closeCart, getTotalPrice, getTotalItems } = useCart();
  const { items, isOpen } = state;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Panier ({getTotalItems()})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600 text-center">Votre panier est vide</p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.quantity} × {item.product.price?.toFixed(2)} MAD
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {(item.product.price * item.quantity).toFixed(2)} MAD
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Total :</span>
                <span className="text-lg font-bold text-gray-900">
                  {getTotalPrice().toFixed(2)} MAD
                </span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => {
                    closeCart();
                    onViewCart();
                  }}
                  className="w-full bg-gray-100 text-gray-900 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Voir le panier
                </button>
                <button
                  onClick={() => {
                    closeCart();
                    onCheckout();
                  }}
                  className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Commander</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;