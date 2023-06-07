import classNames from 'classnames';
import { clearItems } from 'features/reducers/cartSlice';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';

import styles from './CartCheckout.module.scss';

export const CartCheckout = () => {
  const dispatch = useAppDispatch();
  const { items, sumOfItems } = useAppSelector((state) => state.cartReducer);

  const sum = Object.values(sumOfItems).reduce((a, b) => a + b, 0);

  const handleCheckout = () => {
    dispatch(clearItems());
  };

  return (
    <div className={styles.checkout}>
      <h3 className={styles.checkout__total}>${sum}</h3>
      <p className={styles.checkout__count}>Total for {items.length} items</p>

      <button
        className={classNames(styles.checkout__button, {
          [styles.checkout__button_disabled]: items.length < 1
        })}
        onClick={handleCheckout}
        disabled={items.length < 1}
      >
        Checkout
      </button>
    </div>
  );
};
