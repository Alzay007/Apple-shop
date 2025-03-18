import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from 'types/Product';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import {
  addItem,
  removeItem,
  saveCartToFirestore
} from 'features/reducers/cartSlice';
import {
  addFavItem,
  removeFavItem,
  saveWishListToFirestore
} from 'features/reducers/wishlistSlice';
import {
  selectIsCardInArray,
  selectIsCardInFavouriteArray
} from 'features/reducers/selectors';
import { BASE_URL } from 'features/reducers/thunk';
import { openSnackBar } from 'features/reducers/modalSlice';
import { useAuth } from 'features/hooks/useAuth';

import styles from './Card.module.scss';

import redHeartIcon from '../../assets/icons/redHeart.svg';
import defaultHeartIcon from '../../assets/icons/favourites.svg';

interface Props {
  product: Product;
}

export const Card: React.FC<Props> = ({
  product: { name, fullPrice, capacity, screen, rating, image, id, itemId }
}) => {
  const dispatch = useAppDispatch();
  const { isAuth, userId } = useAuth();
  const imageSrc = image.startsWith('http') ? image : `${BASE_URL}/${image}`;

  const isCardInArray = useAppSelector((state) =>
    selectIsCardInArray(state, id)
  );
  const isCardInFavouriteArray = useAppSelector((state) =>
    selectIsCardInFavouriteArray(state, id)
  );

  const handleSetCardInData = useCallback(() => {
    dispatch(isCardInArray ? removeItem(id) : addItem(id));
    if (isAuth && userId !== null) {
      dispatch(saveCartToFirestore(userId));
    }
  }, [dispatch, id, isAuth, userId, isCardInArray]);

  const handleSetItemInFavourite = useCallback(() => {
    dispatch(isCardInFavouriteArray ? removeFavItem(id) : addFavItem(id));
    if (isAuth && userId !== null) {
      dispatch(saveWishListToFirestore(userId));
    }
  }, [dispatch, id, isAuth, userId, isCardInFavouriteArray]);

  const handleSetOpenSnack = useCallback(() => {
    dispatch(openSnackBar());
  }, [dispatch]);

  return (
    <div className={styles.card}>
      <NavLink to={`/${itemId}`}>
        <img
          src={imageSrc}
          alt={name}
          className={styles.card_logo}
          loading="lazy"
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
          aria-label="wishlist_btn"
          className={classNames(styles.card_wishlist)}
          onClick={isAuth ? handleSetItemInFavourite : handleSetOpenSnack}
        >
          <img
            src={isCardInFavouriteArray ? redHeartIcon : defaultHeartIcon}
            alt="wishlist icon"
          />
        </button>
      </div>
    </div>
  );
};
