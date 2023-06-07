import { CategoriesItem } from '../CategoriesItem';
import styles from './Categories.module.scss';

export const Categories = () => {
  return (
    <div className={styles.categories}>
      <h1 className={styles.categories__title}>It`s time to choose...</h1>
      <div className={styles.categories__arrow}>
        <span className={styles.categories__arrow_item}></span>
        <span className={styles.categories__arrow_item}></span>
        <span className={styles.categories__arrow_item}></span>
      </div>

      <div className={styles.categories__list}>
        <CategoriesItem
          subtitle="Laptops"
          imageClass={styles.categories__img1}
          path="/laptops"
        />
        <CategoriesItem
          subtitle="Phones"
          imageClass={styles.categories__img2}
          path="/phones"
        />
        <CategoriesItem
          subtitle="Tablets"
          imageClass={styles.categories__img3}
          path="/tablets"
        />
        <CategoriesItem
          subtitle="Watches"
          imageClass={styles.categories__img4}
          path="/watches"
        />
      </div>
    </div>
  );
};
