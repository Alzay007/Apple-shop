import { Product } from '../../types/Product';
import { CartItem } from '../CartItem';
import styles from './CartList.module.scss';

interface Props {
  cartList: Product[];
}

export const CartList: React.FC<Props> = ({ cartList }) => {
  return (
    <div className={styles.CartList}>
      <div className={styles.CartList__wrapper}>
        {cartList.map((product: Product) => (
          <CartItem
            key={+product.id}
            name={product.name}
            image={product.image}
            price={product.fullPrice}
            id={product.id}
          />
        ))}
      </div>
    </div>
  );
};
