import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Title } from 'components/Title';
import { Loader } from 'components/Loader';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { BASE_URL } from 'features/reducers/thunk';

import { addItem, removeItem } from 'features/reducers/cartSlice';
import { AuthSnackbar } from 'components/AuthSnackBar';
import { openSnackBar } from 'features/reducers/snackSlice';
import { useAuth } from 'features/hooks/useAuth';

import styles from './ProductDetailPage.module.scss';

export const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, goods } = useAppSelector((state) => state.goodsReducer);
  const { items } = useAppSelector((state) => state.cartReducer);
  const { itemId } = useParams();
  const { isAuth } = useAuth();

  const currentProduct = goods.find((item) => item.itemId === itemId);

  const currentId = currentProduct ? currentProduct.id : '1';

  const isCardInArray = items.includes(currentId);

  const handleSetCardInData = () => {
    if (!isCardInArray) {
      dispatch(addItem(currentId));
    } else {
      dispatch(removeItem(currentId));
    }
  };

  const handleSetOpenSnack = () => {
    dispatch(openSnackBar());
  };

  return (
    <div className={styles.detail}>
      {isLoading && <Loader />}

      <Title title={currentProduct?.name} />

      <div className={styles.detail__content}>
        <div className={styles.detail__image}>
          <img
            src={`${BASE_URL}/${currentProduct?.image}`}
            alt="card-logo"
            className={styles.detail__logo}
          />
        </div>

        <div className={styles.detail__info}>
          <div className={styles.detail__price}>
            Price: ${currentProduct?.fullPrice}
          </div>

          <div className={styles.detail__characteristics}>
            <div className={styles.detail__description}>
              <span className={styles.detail__text}>Rating</span>
              <div className={styles.detail__rating}>
                <span className={styles.detail__value}>
                  {currentProduct?.rating}
                </span>
                <div className={styles.detail__star}></div>
              </div>
            </div>
            <div className={styles.detail__description}>
              <span className={styles.detail__text}>Year</span>
              <span className={styles.detail__value}>
                {currentProduct?.year}
              </span>
            </div>
            <div className={styles.detail__description}>
              <span className={styles.detail__text}>RAM</span>
              <span className={styles.detail__value}>
                {currentProduct?.ram}
              </span>
            </div>
            <div className={styles.detail__description}>
              <span className={styles.detail__text}>Capacity</span>
              <span className={styles.detail__value}>
                {currentProduct?.capacity}
              </span>
            </div>
            <div className={styles.detail__description}>
              <span className={styles.detail__text}>Screen</span>
              <span className={styles.detail__value}>
                {currentProduct?.screen}
              </span>
            </div>
          </div>

          <button
            className={classNames(styles.detail__checkout, {
              [styles.detail__uncheckout]: isCardInArray
            })}
            onClick={isAuth ? handleSetCardInData : handleSetOpenSnack}
          >
            {isCardInArray ? 'Added' : 'Add to cart'}
          </button>
        </div>
      </div>

      <AuthSnackbar />
    </div>
  );
};
