import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/icons/logo.png';
import arrow from '../../assets/icons/arrow.svg';
import styles from './Footer.module.scss';
import { animateScroll as scroll } from 'react-scroll';

export const Footer = () => {
  const handleToTheTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <Link to="/" className={styles.footer__icon}>
          <img src={logo} alt="logo" className={styles.footer__logo} />
        </Link>

        <div className={styles.footer__list}>
          <NavLink to="/Support" className={styles.footer__item}>
            Support
          </NavLink>
          <NavLink to="/Contacts" className={styles.footer__item}>
            Contacts
          </NavLink>
          <NavLink to="/About" className={styles.footer__item}>
            About US
          </NavLink>
        </div>

        <button className={styles.footer__button} onClick={handleToTheTop}>
          Back to top
          <img src={arrow} alt="logo" className={styles.footer__arrow} />
        </button>
      </div>
    </div>
  );
};
