import { Product } from '../../types/Product';
import { Card } from '../Card';
import styles from './GoodsList.module.scss';

interface Props {
  itemsList: Product[];
}

export const GoodsList: React.FC<Props> = ({ itemsList }) => {
  return (
    <div className={styles.container}>
      {itemsList.map((item) => (
        <Card key={item.id} product={item} />
      ))}
    </div>
  );
};
