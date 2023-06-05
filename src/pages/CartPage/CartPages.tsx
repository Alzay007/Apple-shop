import { useAppSelector } from '../../features/hooks/hooks';
import { useEffect, useMemo } from 'react';
import styles from './CartPages.module.scss';
import empty from '../../assets/icons/emptyCart.svg';
import { CartList } from '../../components/CartList';
import { CartCheckout } from '../../components/CartCheckout';
import { Product } from '../../types/Product';
import { Title } from '../../components/Title';
import { ModalWindow } from '../../components/ModalWindow';

export const CartPage = () => {
  const data = JSON.parse(localStorage.getItem('id') || '{}');
  const { items, isModalOpen } = useAppSelector((state) => state.cartReducer);
  const { goods } = useAppSelector((state) => state.goodsReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleList = useMemo(() => {
    return goods.filter((phone: Product) => data?.includes(phone.id));
  }, [items, goods]);

  const sumOfprices = visibleList
    .map((el) => el.fullPrice)
    .reduce((a, b) => a + b, 0);

  return (
    <div className={styles.cart}>
      <Title title={'Cart'} />

      {isModalOpen && <ModalWindow />}

      {items.length < 1 ? (
        <div className={styles.cart__empty}>
          <img src={empty} alt="arrow" className={styles.cart__empty_img} />
          <span className={styles.cart__empty_text}>cart is empty</span>
        </div>
      ) : (
        <div className={styles.cart__content}>
          <CartList cartList={visibleList} />
          <CartCheckout sum={sumOfprices} />
        </div>
      )}
    </div>
  );
};
