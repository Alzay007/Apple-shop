import { ProductType } from 'types/ProductType';
import styles from './SpecsSection.module.scss';

interface Props {
  phone: ProductType | undefined;
}

export const SpecsSection: React.FC<Props> = ({ phone }) => {
  return (
    <div className={styles.specs}>
      <h2 className={styles.specs__title}>Tech specs</h2>
      <div className={styles.specs__characteristic}>
        <p className={styles.specs__name}>Screen</p>
        <p className={styles.specs__value}>{phone?.screen}</p>
      </div>
      <div className={styles.specs__characteristic}>
        <p className={styles.specs__name}>Resolution</p>
        <p className={styles.specs__value}>{phone?.resolution}</p>
      </div>
      <div className={styles.specs__characteristic}>
        <p className={styles.specs__name}>Processor</p>
        <p className={styles.specs__value}>{phone?.processor}</p>
      </div>
      <div className={styles.specs__characteristic}>
        <p className={styles.specs__name}>RAM</p>
        <p className={styles.specs__value}>{phone?.ram}</p>
      </div>
      <div className={styles.specs__characteristic}>
        <p className={styles.specs__name}>Built in memory</p>
        <p className={styles.specs__value}>{phone?.capacity}</p>
      </div>
      <div className={styles.specs__characteristic}>
        <p className={styles.specs__name}>Camera</p>
        <p className={styles.specs__value}>{phone?.camera}</p>
      </div>
      <div className={styles.specs__characteristic}>
        <p className={styles.specs__name}>Zoom</p>
        <p className={styles.specs__value}>{phone?.zoom}</p>
      </div>
      <div className={styles.specs__characteristic}>
        <p className={styles.specs__name}>Ceil</p>
        <p className={styles.specs__value}>{phone?.cell.join(', ')}</p>
      </div>
    </div>
  );
};
