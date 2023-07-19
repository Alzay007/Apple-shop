import { NavLink } from 'react-router-dom';
import { ROUTER } from '../Header';

import styles from './Title.module.scss';
import arrow from 'assets/icons/greyArrowLeft.svg';
import house from 'assets/icons/house.svg';

interface Props {
  title: string | undefined;
  count: number;
}

export const Title: React.FC<Props> = ({ title, count }) => (
  <div className={styles.title}>
    <div className={styles.title_navigation}>
      <NavLink to={ROUTER.home}>
        <img src={house} alt="home" className={styles.title_house} />
      </NavLink>
      <img src={arrow} alt="arrow" className={styles.title_arrow} />
      <p className={styles.title_arrowText}>{title}</p>
    </div>
    <h1 className={styles.title_lable}>{title}</h1>
    <p className={styles.title_count}>{`${count} models`}</p>
  </div>
);
