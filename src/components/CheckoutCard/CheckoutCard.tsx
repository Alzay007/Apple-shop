import styles from './CheckoutCard.module.scss';

import ipadImage from '../../assets/images/ipad.png';

interface CheckoutCardProps {
  name: string;
  code: string;
  price: string;
}

export const CheckoutCard: React.FC<CheckoutCardProps> = ({
  name,
  code,
  price
}) => {
  return (
    <div className={styles.checkout_card}>
      <div className={styles.checkout_card__img_wrapper}>
        <img src={ipadImage} alt={name} />
      </div>
      <h3 className={styles.checkout_card__name}>{name}</h3>
      <p className={styles.checkout_card__count}>{code}</p>
      <p className={styles.checkout_card__price}>{price}</p>
    </div>
  );
};
