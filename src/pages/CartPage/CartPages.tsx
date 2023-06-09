import { useEffect, useMemo } from 'react';
import { useAppSelector } from 'features/hooks/hooks';
import { CartList } from 'components/CartList';
import { CartCheckout } from 'components/CartCheckout';
import { Product } from 'types/Product';
import { Title } from 'components/Title';
import { ModalWindow } from 'components/ModalWindow';
import { useAuth } from 'features/hooks/useAuth';

import styles from './CartPages.module.scss';
import empty from 'assets/icons/emptyCart.svg';

export const CartPage = () => {
  const data = JSON.parse(localStorage.getItem('id') || '{}');
  const { items, isModalOpen } = useAppSelector((state) => state.cartReducer);
  const { goods } = useAppSelector((state) => state.goodsReducer);
  const { isAuth } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleList = useMemo(() => {
    return goods.filter((phone: Product) => items.includes(phone.id));
  }, [items, goods]);

  return (
    <>
      {isModalOpen && <ModalWindow />}

      <div className={styles.cart}>
        <Title title={'Cart'} />

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
                  <>
                    <CartList cartList={visibleList} />
                    <CartCheckout />
                  </>
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
