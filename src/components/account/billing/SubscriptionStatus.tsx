import React from 'react';
import { Crown } from 'lucide-react';
import ActionButton from '../shared/ActionButton';

const SubscriptionStatus: React.FC = () => {
  // TODO: Replace with actual subscription data from Firebase/Stripe
  const subscriptionData = {
    plan: 'Premium',
    price: '$9.99/month',
    nextBilling: 'March 15, 2024',
    isActive: true
  };

  const handleManageSubscription = () => {
    // TODO: Integrate with Stripe customer portal
    console.log('Opening subscription management...');
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {subscriptionData.plan} Subscription
          </h3>
          <p className="text-gray-600">
            Access to advanced features and exclusive content
          </p>
        </div>
        <Crown className="w-8 h-8 text-purple-600" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">
            Next billing: {subscriptionData.nextBilling}
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {subscriptionData.price}
          </div>
        </div>
        <ActionButton
          variant="primary"
          onClick={handleManageSubscription}
        >
          Manage Subscription
        </ActionButton>
      </div>
    </div>
  );
};

export default SubscriptionStatus;