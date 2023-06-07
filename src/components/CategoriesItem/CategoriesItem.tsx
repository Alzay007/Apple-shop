import { NavLink } from 'react-router-dom';
import styles from '../Categories/Categories.module.scss';

interface Props {
  subtitle: string;
  imageClass: string;
  path: string;
}

export const CategoriesItem: React.FC<Props> = ({
  subtitle,
  imageClass,
  path
}) => {
  return (
    <div className={styles.categories__item}>
      <h2 className={styles.categories__subtitle}>{subtitle}</h2>
      <div className={[styles.categories__image, imageClass].join(' ')}></div>
      <NavLink to={path}>
        <button className={styles.categories__button}>View All</button>
      </NavLink>
    </div>
  );
};
