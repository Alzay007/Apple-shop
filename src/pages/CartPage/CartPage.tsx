import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { CartList } from 'components/CartList';
import { CartCheckout } from 'components/CartCheckout';
import { Loader } from 'components/Loader';
import { Product } from 'types/Product';
import {
  clearCart,
  saveCartToFirestore,
  setVisibleListLoaded
} from 'features/reducers/cartSlice';
import { useAuth } from 'features/hooks/useAuth';

import styles from './CartPage.module.scss';
import empty from 'assets/icons/emptyCart.svg';
import arrow from 'assets/icons/greyArrowLeft.svg';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const { items, goods, isLoading, isCartLoading } = useAppSelector(
    (state) => ({
      items: state.cartReducer.items,
      goods: state.goodsReducer.goods,
      isCartLoading: state.cartReducer.isCartLoading,
      isLoading: state.goodsReducer.isLoading
    })
  );
  const { isAuth, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleList = useMemo(() => {
    const itemSet = new Set(items);
    return goods.filter((phone: Product) => itemSet.has(phone.id));
  }, [items, goods]);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        dispatch(setVisibleListLoaded());
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    if (isAuth && userId) {
      dispatch(saveCartToFirestore(userId));
    }
  }, [dispatch]);

  return isLoading || isCartLoading ? (
    <Loader />
  ) : (
    <div className={styles.cart}>
      <div className={styles.title}>
        <div className={styles.title__nav} onClick={() => navigate(-1)}>
          <img src={arrow} alt="arrow" className={styles.title__arrow} />
          <p className={styles.title__text}>Back</p>
        </div>
        <h1 className={styles.title__headline}>Cart</h1>
      </div>

      {visibleList.length < 1 ? (
        <div className={styles.cart__empty}>
          <img
            src={empty}
            alt="empty-cart"
            className={styles.cart__empty_img}
            loading="lazy"
          />
          <span className={styles.cart__empty_title}>
            Oh dear. Your cart is empty.
          </span>
          <span className={styles.cart__empty_description}>
            Fill it with selected items or use the search and catalog.
          </span>
        </div>
      ) : (
        <div className={styles.cart__content}>
          <Button
            className={styles.cart__clear}
            variant="contained"
            sx={{
              margin: 2,
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'error.dark'
              }
            }}
            startIcon={<DeleteIcon />}
            onClick={handleClearCart}
          >
            Delete all
          </Button>
          <div className={styles.cart__list}>
            <CartList cartList={visibleList} />
            <CartCheckout />
          </div>
        </div>
      )}
    </div>
  );
};
