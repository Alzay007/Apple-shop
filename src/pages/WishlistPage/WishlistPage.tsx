import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'features/hooks/hooks';
import { Product } from 'types/Product';

import styles from './WishlistPage.module.scss';
import arrow from 'assets/icons/greyArrowLeft.svg';
import { Card } from './../../components/Card';

export const WishlistPage = () => {
  const { favItems } = useAppSelector((state) => state.wishlistReducer);
  const { goods } = useAppSelector((state) => state.goodsReducer);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleList = useMemo(() => {
    return goods.filter((phone: Product) => favItems.includes(phone.id));
  }, [favItems, goods]);

  const count = visibleList.length;

  return (
    <div className={styles.wishlist}>
      <div className={styles.title}>
        <div className={styles.title__nav} onClick={() => navigate(-1)}>
          <img src={arrow} alt="arrow" className={styles.title__arrow} />
          <p className={styles.title__text}>Back</p>
        </div>
        <h1 className={styles.title__headline}>Wishlist</h1>
        {count > 0 && <p className={styles.title__count}>{`${count} items`}</p>}
      </div>

      {favItems.length < 1 ? (
        <div className={styles.wishlist__empty}>
          <span className={styles.wishlist__empty_description}>
            Your wishlist is empty. Start adding your favorite items to this
            list!
          </span>
          <p className={styles.wishlist__empty_description}>
            Browse our catalog and click the heart icon on any product to add it
            to your wishlist.
          </p>
        </div>
      ) : (
        <div className={styles.wishlist__list}>
          {visibleList.map((item) => (
            <Card key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};
