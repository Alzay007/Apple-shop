import { clearItems } from '../../features/reducers/cartSlice';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import styles from './CartCheckout.module.scss';

interface Props {
  sum: number;
}

export const CartCheckout: React.FC<Props> = ({ sum }) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cartReducer);

  const handleCheckout = () => {
    dispatch(clearItems());
    localStorage.removeItem('id');
  };

  return (
    <div className={styles.checkout}>
      <h3 className={styles.checkout__total}>${sum}</h3>
      <p className={styles.checkout__count}>Total for {items.length} items</p>

      <button className={styles.checkout__button} onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};
