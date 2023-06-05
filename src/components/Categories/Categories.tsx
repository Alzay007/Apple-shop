import { NavLink } from 'react-router-dom';
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
        <div className={styles.categories__item}>
          <h2 className={styles.categories__subtitle}>Laptops</h2>
          <div
            className={[styles.categories__image, styles.categories__img1].join(
              ' ',
            )}
          ></div>
          <NavLink to="/laptops">
            <button className={styles.categories__button}>View All</button>
          </NavLink>
        </div>
        <div className={styles.categories__item}>
          <h2 className={styles.categories__subtitle}>Phones</h2>
          <div
            className={[styles.categories__image, styles.categories__img2].join(
              ' ',
            )}
          ></div>
          <NavLink to="/phones">
            <button className={styles.categories__button}>View All</button>
          </NavLink>
        </div>
        <div className={styles.categories__item}>
          <h2 className={styles.categories__subtitle}>Tablets</h2>
          <div
            className={[styles.categories__image, styles.categories__img3].join(
              ' ',
            )}
          ></div>
          <NavLink to="/tablets">
            <button className={styles.categories__button}>View All</button>
          </NavLink>
        </div>
        <div className={styles.categories__item}>
          <h2 className={styles.categories__subtitle}>Watches</h2>
          <div
            className={[styles.categories__image, styles.categories__img4].join(
              ' ',
            )}
          ></div>
          <NavLink to="/watches">
            <button className={styles.categories__button}>View All</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
