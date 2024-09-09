import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'features/hooks/hooks';
import { ROUTER } from '../Header';

import styles from './CartCheckout.module.scss';

export const CartCheckout = () => {
  const { items, sumOfItems } = useAppSelector((state) => state.cartReducer);

  const sum = Object.values(sumOfItems).reduce((a, b) => a + b, 0);

  return (
    <div className={styles.checkout}>
      <h3 className={styles.checkout__total}>${sum}</h3>
      <p className={styles.checkout__count}>Total for {items.length} items</p>

      <NavLink to={ROUTER.checkout} className={styles.checkout__button}>
        Checkout
      </NavLink>
    </div>
  );
};
