import { NavLink } from 'react-router-dom';
import styles from '../Categories/Categories.module.scss';

interface Props {
  subtitle: string;
  imageSrc: string;
  path: string;
}

export const CategoriesItem: React.FC<Props> = ({
  subtitle,
  imageSrc,
  path
}) => {
  return (
    <div className={styles.categories__item}>
      <h3 className={styles.categories__subtitle}>{subtitle}</h3>
      <div className={styles.categories__img_wrapper}>
        <img src={imageSrc} alt="category_image" />
      </div>
      <NavLink to={path} className={styles.categories__btn}>
        <span>View All</span>
      </NavLink>
    </div>
  );
};
