import { PaymentForm } from '../../components/PaymentForm';

import styles from './CheckoutPage.module.scss';

export const CheckoutPage = () => {
  return (
    <div className={styles.checkout__page}>
      <PaymentForm />
    </div>
  );
};
