import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentFormProps {
  paymentMethod: string;
  total: number;
  onBack: () => void;
  onPaymentComplete: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ paymentMethod, total, onBack, onPaymentComplete }) => {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'number') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    } else if (field === 'expiry') {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setCardData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate random success/failure for demo
      if (Math.random() > 0.1) {
        onPaymentComplete();
      } else {
        throw new Error('Paiement refusé. Veuillez vérifier vos informations.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de paiement');
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="h-4 w-4 inline mr-2" />
                Numéro de carte
              </label>
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => handleCardInputChange('number', e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du titulaire
              </label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => handleCardInputChange('name', e.target.value)}
                placeholder="Jean Dupont"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Date d'expiration
                </label>
                <input
                  type="text"
                  value={cardData.expiry}
                  onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                  placeholder="MM/AA"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardData.cvv}
                  onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
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
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Traitement en cours...</span>
                </>
              ) : (
                <span>Payer {total.toFixed(2)} €</span>
              )}
            </button>
          </form>
        );

      case 'paypal':
        return (
          <div className="text-center py-8">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Redirection vers PayPal</h3>
              <p className="text-gray-600">Vous allez être redirigé vers PayPal pour finaliser votre paiement de manière sécurisée.</p>
            </div>
            <button
              onClick={onPaymentComplete}
              className="bg-yellow-500 text-white py-3 px-8 rounded-lg font-medium hover:bg-yellow-600 transition-colors duration-200"
            >
              Continuer avec PayPal
            </button>
          </div>
        );

      case 'delivery':
        return (
          <div className="text-center py-8">
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paiement à la livraison</h3>
              <p className="text-gray-600 mb-4">
                Vous pourrez payer en espèces ou par carte bancaire directement au livreur.
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Paiement en espèces accepté</p>
                <p>• Terminal de paiement disponible</p>
                <p>• Frais de service : 2,50 €</p>
              </div>
            </div>
            <button
              onClick={onPaymentComplete}
              className="bg-green-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            >
              Confirmer la commande
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {paymentMethod === 'card' && 'Informations de paiement'}
            {paymentMethod === 'paypal' && 'Paiement PayPal'}
            {paymentMethod === 'delivery' && 'Paiement à la livraison'}
          </h2>
          <p className="text-gray-600">
            Total à payer : <span className="font-semibold text-blue-600">{total.toFixed(2)} €</span>
          </p>
        </div>

        {/* Payment Form */}
        <div className="p-6">
          {renderPaymentForm()}
        </div>

        {/* Back Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour aux options de paiement</span>
          </button>
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-green-50 border-t border-green-200">
          <div className="flex items-center space-x-2 text-green-700">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Connexion sécurisée SSL - Vos données sont cryptées</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;