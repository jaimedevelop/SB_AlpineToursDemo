import React from 'react';
import styles from '../../../styles/shared.module.css';

interface Purchase {
  id: string;
  item: string;
  date: string;
  amount: string;
}

const PurchaseHistory: React.FC = () => {
  // TODO: Replace with actual purchase history from Firebase/Stripe
  const purchases: Purchase[] = [
    {
      id: '1',
      item: 'Premium Subscription',
      date: '2024-02-15',
      amount: '$9.99'
    },
    {
      id: '2',
      item: 'Whistler Trip Booking',
      date: '2024-01-28',
      amount: '$299.00'
    },
    {
      id: '3',
      item: 'Ski Helmet - Smith Vantage',
      date: '2024-01-15',
      amount: '$179.99'
    }
  ];

  const handleViewReceipt = (purchaseId: string) => {
    // TODO: Generate/download receipt
    console.log('Viewing receipt for:', purchaseId);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Recent Purchases</h3>
      <div className="space-y-3">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{purchase.item}</div>
              <div className="text-sm text-gray-600">{purchase.date}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{purchase.amount}</div>
              <button 
                onClick={() => handleViewReceipt(purchase.id)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Receipt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;