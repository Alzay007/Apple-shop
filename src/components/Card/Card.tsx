import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from 'types/Product';

import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { addItem, removeItem } from 'features/reducers/cartSlice';
import { BASE_URL } from 'features/reducers/thunk';
import { openSnackBar } from 'features/reducers/modalSlice';
import { useAuth } from 'features/hooks/useAuth';

import styles from './Card.module.scss';

interface Props {
  product: Product;
}

export const Card: React.FC<Props> = ({
  product: { name, fullPrice, capacity, screen, rating, image, id, itemId }
}) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  const { items } = useAppSelector((state) => state.cartReducer);

  const itemsSet = new Set(items);
  const isCardInArray = itemsSet.has(id);

  const handleSetCardInData = () => {
    if (!isCardInArray) {
      dispatch(addItem(id));
    } else {
      dispatch(removeItem(id));
    }
  };

  const handleSetOpenSnack = () => {
    dispatch(openSnackBar());
  };

  return (
    <div className={styles.card}>
      <NavLink to={`/${itemId}`}>
        <img
          src={`${BASE_URL}/${image}`}
          alt="card-logo"
          className={styles.card_logo}
        />
      </NavLink>

      <span className={styles.card_title}>{name}</span>
      <div className={styles.card_price}>
        <span className={styles.card_newPrice}>${fullPrice}</span>
      </div>
      <div className={styles.card_characteristics}>
        <div className={styles.card_description}>
          <span className={styles.card_text}>Rating</span>
          <div className={styles.card_rating}>
            <span className={styles.card_value}>{rating}</span>
            <div className={styles.card_star}></div>
          </div>
        </div>
        <div className={styles.card_description}>
          <span className={styles.card_text}>Capacity</span>
          <span className={styles.card_value}>{capacity}</span>
        </div>
        <div className={styles.card_description}>
          <span className={styles.card_text}>Screen</span>
          <span className={styles.card_value}>{screen}</span>
        </div>
      </div>
      <div className={styles.card_buttons}>
        <button
          className={classNames(styles.card_checkout, {
            [styles.card_uncheckout]: isCardInArray
          })}
          onClick={isAuth ? handleSetCardInData : handleSetOpenSnack}
        >
          {isCardInArray ? 'Added' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
};
