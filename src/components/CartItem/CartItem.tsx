import deleteCross from '../../assets/icons/cross.svg';
import plus from '../../assets/icons/plus.svg';
import minus from '../../assets/icons/minus.svg';
import { useAppDispatch } from 'features/hooks/hooks';
import { removeItem } from 'features/reducers/cartSlice';
import { BASE_URL } from 'features/reducers/thunk';

import styles from './CartItem.module.scss';

interface Props {
  name: string;
  image: string;
  price: number;
  id: string;
}

export const CartItem: React.FC<Props> = ({ name, image, price, id }) => {
  const goods = JSON.parse(localStorage.getItem('id') || '{}');
  const dispatch = useAppDispatch();

  const handleRemoveItem = () => {
    goods.splice(goods.indexOf(id), 1);
    localStorage.setItem('id', JSON.stringify(goods));
    dispatch(removeItem(id));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__info}>
        <div
          className={styles.cartItem__delete_button}
          onClick={handleRemoveItem}
        >
          <img
            src={deleteCross}
            className={styles.cartItem__delete_button_img}
          />
        </div>

        <img src={`${BASE_URL}/${image}`} className={styles.cartItem__img} />

        <p className={styles.cartItem__description}>{name}</p>
      </div>

      <div className={styles.cartItem__count}>
        <button className={styles.cartItem__count_button}>
          <img src={minus} className={styles.cartItem__count_button_symbol} />
        </button>
        <div className={styles.cartItem__count_number}>{1}</div>
        <button className={styles.cartItem__count_button}>
          <img src={plus} className={styles.cartItem__count_button_symbol} />
        </button>
        <div className={styles.cartItem__price}>{price}$</div>
      </div>
    </div>
  );
};
