import React from 'react';
import { CreditCard, Plus } from 'lucide-react';
import ActionButton from '../shared/ActionButton';
import styles from '../../../styles/shared.module.css';

interface PaymentMethod {
  id: string;
  lastFour: string;
  expiryDate: string;
  isDefault: boolean;
}

const PaymentMethods: React.FC = () => {
  // TODO: Replace with actual payment methods from Stripe
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      lastFour: '4242',
      expiryDate: '12/26',
      isDefault: true
    }
  ];

  const handleAddPaymentMethod = () => {
    // TODO: Integrate with Stripe Elements
    console.log('Adding new payment method...');
  };

  const handleEditPaymentMethod = (methodId: string) => {
    // TODO: Integrate with Stripe
    console.log('Editing payment method:', methodId);
  };

  const handleRemovePaymentMethod = (methodId: string) => {
    // TODO: Integrate with Stripe
    console.log('Removing payment method:', methodId);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Payment Methods</h3>
        <ActionButton
          variant="secondary"
          onClick={handleAddPaymentMethod}
          icon={<Plus className="w-5 h-5" />}
        >
          Add
        </ActionButton>
      </div>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium text-gray-900">
                  •••• •••• •••• {method.lastFour}
                </div>
                <div className="text-sm text-gray-600">
                  Expires {method.expiryDate}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleEditPaymentMethod(method.id)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Edit
              </button>
              <button 
                onClick={() => handleRemovePaymentMethod(method.id)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;