import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartProps {
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ onCheckout }) => {
  const { state, removeItem, updateQuantity, getTotalPrice } = useCart();
  const { items } = state;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <ShoppingBag className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Votre panier est vide</h3>
        <p className="text-gray-500 text-center max-w-md">
          Il semble que vous n'ayez ajouté aucun article à votre panier. Commencez vos achats pour ajouter des articles à votre panier.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Panier d'achat</h2>
          <p className="text-gray-600 mt-1">{items.length} {items.length === 1 ? 'article' : 'articles'} dans votre panier</p>
        </div>

        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.product.id} className="p-6 flex items-center space-x-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.product.description}</p>
                <p className="text-xl font-semibold text-blue-600 mt-2">
                  {item.product.price.toFixed(2)} €
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                
                <span className="px-3 py-1 bg-gray-100 rounded-md font-medium min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {(item.product.price * item.quantity).toFixed(2)} €
                </p>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="mt-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-900">Total :</span>
            <span className="text-2xl font-bold text-gray-900">
              {getTotalPrice().toFixed(2)} €
            </span>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 group"
          >
            <span>Procéder au paiement</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;