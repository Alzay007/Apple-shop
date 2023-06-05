import { useNavigate } from 'react-router-dom';
import styles from './Title.module.scss';
import arrow from '../../assets/icons/greyArrowLeft.svg';

interface Props {
  title: string | undefined;
}

export const Title: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.title}>
      <div className={styles.title__nav} onClick={() => navigate(-1)}>
        <img src={arrow} alt="arrow" className={styles.title__arrow} />
        <p className={styles.title__text}>Back</p>
      </div>
      <h1 className={styles.title__headline}>{title}</h1>
    </div>
  );
};
