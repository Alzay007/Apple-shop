import { clearItems } from 'features/reducers/cartSlice';
import { useAppDispatch } from '../../features/hooks/hooks';
import styles from './CartCheckout.module.scss';

interface Props {
  sum: number;
  count: number;
}

export const CartCheckout: React.FC<Props> = ({ sum, count }) => {
  const dispatch = useAppDispatch();

  const handleCheckout = () => {
    dispatch(clearItems());
  };

  return (
    <div className={styles.checkout}>
      <h3 className={styles.checkout__total}>${sum}</h3>
      <p className={styles.checkout__count}>Total for {count} items</p>

      <button className={styles.checkout__button} onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};
