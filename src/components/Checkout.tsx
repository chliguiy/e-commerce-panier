import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Customer, Order } from '../types';
import { ApiService } from '../utils/api';
import { User, Mail, Phone, MapPin, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import PaymentOptions from './PaymentOptions';
import PaymentForm from './PaymentForm';

interface CheckoutProps {
  onOrderComplete: () => void;
}

type CheckoutStep = 'customer' | 'payment' | 'form' | 'success';

const Checkout: React.FC<CheckoutProps> = ({ onOrderComplete }) => {
  const { state, clearCart, getTotalPrice } = useCart();
  const { items } = state;

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof Customer, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  const validateCustomerForm = () => {
    if (!customer.name.trim()) return 'Le nom est requis';
    if (!customer.email.trim()) return 'L\'email est requis';
    if (!customer.phone.trim()) return 'Le téléphone est requis';
    if (!customer.address.trim()) return 'L\'adresse est requise';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer.email)) return 'Veuillez entrer un email valide';
    
    return null;
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateCustomerForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setCurrentStep('payment');
  };

  const handlePaymentSelect = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
    setCurrentStep('form');
  };

  const handlePaymentComplete = async () => {
    setLoading(true);
    setError(null);

    try {
      const order: Order = {
        customer,
        items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total: getTotalPrice(),
        paymentMethod: selectedPaymentMethod
      };

      await ApiService.submitOrder(order);
      setCurrentStep('success');
      clearCart();
      
      setTimeout(() => {
        onOrderComplete();
      }, 5000);
    } catch (err) {
      console.error('Order submission failed:', err);
      setError('Échec de la soumission de la commande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'customer', label: 'Informations', completed: currentStep !== 'customer' },
      { id: 'payment', label: 'Paiement', completed: currentStep === 'form' || currentStep === 'success' },
      { id: 'form', label: 'Finalisation', completed: currentStep === 'success' }
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className={`flex items-center space-x-2 ${
              step.completed ? 'text-green-600' : 
              currentStep === step.id ? 'text-blue-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.completed ? 'bg-green-100' :
                currentStep === step.id ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                {step.completed ? '✓' : index + 1}
              </div>
              <span className="text-sm font-medium">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${
                steps[index + 1].completed ? 'bg-green-600' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  if (currentStep === 'success') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="bg-green-100 rounded-full p-6 mx-auto mb-4 w-fit">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Commande confirmée !</h2>
          <p className="text-gray-600 mb-6">
            Merci pour votre commande. Vous recevrez un email de confirmation sous peu.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              Total de la commande : <span className="font-semibold text-gray-900">{getTotalPrice().toFixed(2)} €</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Mode de paiement : <span className="font-semibold text-gray-900">
                {selectedPaymentMethod === 'card' && 'Carte bancaire'}
                {selectedPaymentMethod === 'paypal' && 'PayPal'}
                {selectedPaymentMethod === 'delivery' && 'Paiement à la livraison'}
              </span>
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Vous serez redirigé automatiquement dans quelques secondes...
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === 'payment') {
    return (
      <div>
        {renderStepIndicator()}
        <PaymentOptions
          onBack={() => setCurrentStep('customer')}
          onPaymentSelect={handlePaymentSelect}
          total={getTotalPrice()}
        />
      </div>
    );
  }

  if (currentStep === 'form') {
    return (
      <div>
        {renderStepIndicator()}
        <PaymentForm
          paymentMethod={selectedPaymentMethod}
          total={getTotalPrice()}
          onBack={() => setCurrentStep('payment')}
          onPaymentComplete={handlePaymentComplete}
        />
      </div>
    );
  }

  return (
    <div>
      {renderStepIndicator()}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif de commande</h3>
          
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Qté : {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {(item.product.price * item.quantity).toFixed(2)} €
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total :</span>
              <span className="text-xl font-bold text-blue-600">
                {getTotalPrice().toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        {/* Customer Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de livraison</h2>

          <form onSubmit={handleCustomerSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Nom complet
              </label>
              <input
                type="text"
                value={customer.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Entrez votre nom complet"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Adresse email
              </label>
              <input
                type="email"
                value={customer.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Entrez votre adresse email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Entrez votre numéro de téléphone"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Adresse de livraison
              </label>
              <textarea
                value={customer.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Entrez votre adresse complète de livraison"
                required
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Continuer vers le paiement</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;