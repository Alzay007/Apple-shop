import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { CartList } from 'components/CartList';
import { CartCheckout } from 'components/CartCheckout';
import { Product } from 'types/Product';
import { clearCart } from 'features/reducers/cartSlice';

import styles from './CartPage.module.scss';
import empty from 'assets/icons/emptyCart.svg';
import arrow from 'assets/icons/greyArrowLeft.svg';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const { items, goods } = useAppSelector((state) => ({
    items: state.cartReducer.items,
    goods: state.goodsReducer.goods
  }));
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleList = useMemo(() => {
    const itemSet = new Set(items);
    return goods.filter((phone: Product) => itemSet.has(phone.id));
  }, [items, goods]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className={styles.cart}>
      <div className={styles.title}>
        <div className={styles.title__nav} onClick={() => navigate(-1)}>
          <img src={arrow} alt="arrow" className={styles.title__arrow} />
          <p className={styles.title__text}>Back</p>
        </div>
        <h1 className={styles.title__headline}>Cart</h1>
      </div>

      {items.length < 1 ? (
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
            color="secondary"
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
