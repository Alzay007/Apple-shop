import image from 'assets/images/coming.png';
import styles from './DevelopmentPage.module.scss';

export const DevelopmentPage = () => {
  return (
    <div className={styles.container}>
      <img src={image} className={styles.image}></img>
    </div>
  );
};
