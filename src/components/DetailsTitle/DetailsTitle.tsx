import { Link, useNavigate } from 'react-router-dom';
import styles from './DetailsTitle.module.scss';

interface Props {
  category: string | undefined;
  name: string | undefined;
}

export const DetailsTitle: React.FC<Props> = ({ category, name }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.nav__logo}>
          <Link to="/" className={styles.logo_home} />
          <div className={styles.logo_vector}></div>
          <Link to={`/${category}`} className={styles.logo_link}>
            {category}
          </Link>
          <div className={styles.logo_vector}></div>
          <p className={styles.logo_text}>{name}</p>
        </div>
        <div className={styles.nav__btn}>
          <Link to={`/${category}`} className={styles.btn_vector} />
          <button
            type="submit"
            className={styles.btn_link}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
      <h1 className={styles.title}>{name}</h1>
    </>
  );
};
