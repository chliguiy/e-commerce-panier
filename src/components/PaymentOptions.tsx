import React, { useState } from 'react';
import { CreditCard, Smartphone, Truck, ArrowLeft, ArrowRight, Lock } from 'lucide-react';

interface PaymentOptionsProps {
  onBack: () => void;
  onPaymentSelect: (paymentMethod: string) => void;
  total: number;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ onBack, onPaymentSelect, total }) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte bancaire',
      description: 'Visa, Mastercard, CB',
      icon: CreditCard,
      popular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Paiement sécurisé avec PayPal',
      icon: Smartphone,
      popular: false
    },
    {
      id: 'delivery',
      name: 'Paiement à la livraison',
      description: 'Payez en espèces ou par carte à la réception',
      icon: Truck,
      popular: false
    }
  ];

  const handleContinue = () => {
    if (selectedPayment) {
      onPaymentSelect(selectedPayment);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <Lock className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Mode de paiement</h2>
          </div>
          <p className="text-gray-600">Choisissez votre méthode de paiement préférée</p>
        </div>

        {/* Payment Methods */}
        <div className="p-6 space-y-4">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <div
                key={method.id}
                className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                  selectedPayment === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                {method.popular && (
                  <div className="absolute -top-2 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Populaire
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    selectedPayment === method.id ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      selectedPayment === method.id ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedPayment === method.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedPayment === method.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-900">Total à payer :</span>
            <span className="text-2xl font-bold text-blue-600">
              {total.toFixed(2)} €
            </span>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour</span>
            </button>
            
            <button
              onClick={handleContinue}
              disabled={!selectedPayment}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Continuer</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-green-50 border-t border-green-200">
          <div className="flex items-center space-x-2 text-green-700">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Paiement 100% sécurisé - Vos données sont protégées</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;