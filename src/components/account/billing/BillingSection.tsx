import React from 'react';
import SubscriptionStatus from './SubscriptionStatus';
import PaymentMethods from './PaymentMethods';
import PurchaseHistory from './PurchaseHistory';
import styles from '../../../styles/shared.module.css';

const BillingSection: React.FC = () => {
  return (
    <div className={styles.sectionContainer}>
      <SubscriptionStatus />
      <PaymentMethods />
      <PurchaseHistory />
    </div>
  );
};

export default BillingSection;