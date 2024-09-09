import { useEffect } from 'react';
import classNames from 'classnames';
import {
  selectItems,
  useAppDispatch,
  useAppSelector
} from 'features/hooks/hooks';
import {
  decrementCount,
  incrementCount,
  removeItem,
  setSumOfItems
} from 'features/reducers/cartSlice';
import { BASE_URL } from 'features/reducers/thunk';

import styles from './CartItem.module.scss';
import deleteCross from 'assets/icons/cross.svg';
import plus from 'assets/icons/plus.svg';
import minus from 'assets/icons/minus.svg';

interface Props {
  name: string;
  image: string;
  price: number;
  id: string;
}

export const CartItem: React.FC<Props> = ({ name, image, price, id }) => {
  const goods = JSON.parse(localStorage.getItem('id') || '{}');
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  const count = items.filter((item) => item === id).length;

  useEffect(() => {
    dispatch(setSumOfItems({ id, price, count }));
  }, []);

  const handleCountUp = () => {
    dispatch(incrementCount({ id, price, count }));
  };

  const handleCountDown = () => {
    dispatch(decrementCount({ id, price, count }));
  };

  const handleRemoveItem = () => {
    goods.splice(goods.indexOf(id), 1);
    localStorage.setItem('id', JSON.stringify(goods));
    dispatch(removeItem(id));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__info}>
        <div className={styles.cartItem__delete_btn} onClick={handleRemoveItem}>
          <img src={deleteCross} />
        </div>

        <img src={`${BASE_URL}/${image}`} className={styles.cartItem__img} />

        <p className={styles.cartItem__description}>{name}</p>
      </div>

      <div className={styles.cartItem__quantity}>
        <div className={styles.cartItem__quantity_control}>
          <button
            className={classNames(styles.cartItem__quantity_button, {
              [styles.cartItem__quantity_button_disabled]: count === 1
            })}
            onClick={handleCountDown}
            disabled={count === 1}
          >
            <img
              src={minus}
              className={styles.cartItem__quantity_button_symbol}
            />
          </button>
          <span className={styles.cartItem__count}>{count}</span>
          <button
            className={classNames(styles.cartItem__quantity_button, {
              [styles.cartItem__quantity_button_disabled]: count === 5
            })}
            onClick={handleCountUp}
            disabled={count === 5}
          >
            <img
              src={plus}
              className={styles.cartItem__quantity_button_symbol}
            />
          </button>
        </div>
        <div className={styles.cartItem__price}>{count * price}$</div>
      </div>
    </div>
  );
};
