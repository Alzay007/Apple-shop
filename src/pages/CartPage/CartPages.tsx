import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { CartList } from 'components/CartList';
import { CartCheckout } from 'components/CartCheckout';
import { Product } from 'types/Product';
import { ModalWindow } from 'components/ModalWindow';
import { useAuth } from 'features/hooks/useAuth';
import { clearCart } from 'features/reducers/cartSlice';

import styles from './CartPages.module.scss';
import empty from 'assets/icons/emptyCart.svg';
import arrow from 'assets/icons/greyArrowLeft.svg';

export const CartPage = () => {
  const data = JSON.parse(localStorage.getItem('id') || '{}');
  const dispatch = useAppDispatch();
  const { items, isModalOpen } = useAppSelector((state) => state.cartReducer);
  const { goods } = useAppSelector((state) => state.goodsReducer);
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleList = useMemo(() => {
    return goods.filter((phone: Product) => items.includes(phone.id));
  }, [items, goods]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {isModalOpen && <ModalWindow />}

      <div className={styles.cart}>
        <div className={styles.title}>
          <div className={styles.title__nav} onClick={() => navigate(-1)}>
            <img src={arrow} alt="arrow" className={styles.title__arrow} />
            <p className={styles.title__text}>Back</p>
          </div>
          <h1 className={styles.title__headline}>Cart</h1>
        </div>

        {items.length < 1 && isAuth ? (
          <div className={styles.cart__empty}>
            <img src={empty} alt="arrow" className={styles.cart__empty_img} />
            <span className={styles.cart__empty_text}>cart is empty</span>
          </div>
        ) : (
          <div className={styles.cart__content}>
            {isAuth ? (
              <>
                {data.length > 0 ? (
                  <div>
                    <Button
                      className={styles.cart__clear}
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleClearCart()}
                    >
                      Delete all
                    </Button>
                    <div className={styles.cart__list}>
                      <CartList cartList={visibleList} />
                      <CartCheckout />
                    </div>
                  </div>
                ) : (
                  <div className={styles.cart__empty}>
                    <img
                      src={empty}
                      alt="arrow"
                      className={styles.cart__empty_img}
                    />
                    <span className={styles.cart__empty_text}>
                      cart is empty
                    </span>
                  </div>
                )}
              </>
            ) : (
              <span className={styles.cart__empty_text}>
                Please, log in to proceed
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};
