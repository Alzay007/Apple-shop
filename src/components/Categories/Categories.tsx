import { CategoriesItem } from '../CategoriesItem';
import styles from './Categories.module.scss';

import macImage from '../../assets/images/mac.png';
import iphoneImage from '../../assets/images/iphone.png';
import ipadImage from '../../assets/images/ipad.png';
import watchImage from '../../assets/images/watch.png';

export const Categories = () => {
  return (
    <div className={styles.categories}>
      <h2>It`s time to choose...</h2>
      <div className={styles.categories__arrow}>
        <span className={styles.categories__arrow_item}></span>
        <span className={styles.categories__arrow_item}></span>
        <span className={styles.categories__arrow_item}></span>
      </div>

      <div className={styles.categories__list}>
        <CategoriesItem
          subtitle="Laptops"
          imageSrc={macImage}
          path="/laptops"
        />
        <CategoriesItem
          subtitle="Phones"
          imageSrc={iphoneImage}
          path="/phones"
        />
        <CategoriesItem
          subtitle="Tablets"
          imageSrc={ipadImage}
          path="/tablets"
        />
        <CategoriesItem
          subtitle="Watches"
          imageSrc={watchImage}
          path="/watches"
        />
      </div>
    </div>
  );
};
