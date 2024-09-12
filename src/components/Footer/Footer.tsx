import { Link, NavLink } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

import logo from 'assets/icons/logo.png';
import arrow from 'assets/icons/arrow.svg';
import styles from './Footer.module.scss';

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

        <nav className={styles.footer__links}>
          <NavLink to="/Support" className={styles.footer__item}>
            Support
          </NavLink>
          <NavLink
            to="https://www.linkedin.com/in/andrii-zaitsev-75604524b/"
            className={styles.footer__item}
          >
            Contacts
          </NavLink>
          <NavLink
            to="https://github.com/Alzay007"
            target="_blank"
            className={styles.footer__item}
          >
            About US
          </NavLink>
        </nav>

        <button className={styles.footer__btn} onClick={handleToTheTop}>
          <span>Back to top</span>
          <img src={arrow} alt="logo" />
        </button>
      </div>
    </div>
  );
};
