import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from 'types/Product';

import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { addItem, removeItem } from 'features/reducers/cartSlice';
import { addFavItem, removeFavItem } from 'features/reducers/wishlistSlice';
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
  const { favItems } = useAppSelector((state) => state.wishlistReducer);

  const itemsSet = new Set(items);
  const favouriteItemsSet = new Set(favItems);
  const isCardInArray = itemsSet.has(id);
  const isCardInFavouriteArray = favouriteItemsSet.has(id);

  const handleSetCardInData = () => {
    if (!isCardInArray) {
      dispatch(addItem(id));
    } else {
      dispatch(removeItem(id));
    }
  };

  const handleSetItemInFavourite = () => {
    if (!isCardInFavouriteArray) {
      dispatch(addFavItem(id));
    } else {
      dispatch(removeFavItem(id));
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
          <p>Rating</p>
          <div className={styles.card_rating}>
            <span>{rating}</span>
            <div className={styles.card_star}></div>
          </div>
        </div>
        <div className={styles.card_description}>
          <span>Capacity</span>
          <span>{capacity}</span>
        </div>
        <div className={styles.card_description}>
          <span>Screen</span>
          <span>{screen}</span>
        </div>
      </div>
      <div className={styles.card_buttons}>
        <button
          className={classNames(styles.card_checkout, {
            [styles.card_uncheckout]: isCardInArray
          })}
          onClick={handleSetCardInData}
        >
          {isCardInArray ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={classNames(styles.card_wishlist, {
            [styles.card_wishlist_heart]: isCardInFavouriteArray
          })}
          onClick={isAuth ? handleSetItemInFavourite : handleSetOpenSnack}
        ></button>
      </div>
    </div>
  );
};
