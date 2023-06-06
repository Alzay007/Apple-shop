import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.png';
import { Counter } from '../Counter';
import { useAppSelector } from '../../features/hooks/hooks';
import { useAuth } from '../../features/hooks/useAuth';

export const ROUTER = {
  home: '/',
  laptops: '/laptops',
  phones: '/phones',
  tablets: '/tablets',
  watches: '/watches',
  cart: '/cart',
  login: '/login',
  signUp: '/registration',
  account: '/account',
  support: '/support',
  contacts: '/contacts',
  productDetalePage: '/goods/:itemId',
};

export const Header = () => {
  const { items } = useAppSelector((state) => state.cartReducer);

  const { isAuth } = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.header__nav}>
        <div className={styles.header__icon}>
          <Link to="/">
            <img src={logo} alt="logo" className={styles.header__logo} />
          </Link>
        </div>
      </div>

      <nav className={styles.header__list}>
        <NavLink to={ROUTER.home} className={styles.header__link}>
          Home
        </NavLink>
        <NavLink to={ROUTER.laptops} className={styles.header__link}>
          Laptops
        </NavLink>
        <NavLink to={ROUTER.phones} className={styles.header__link}>
          Phones
        </NavLink>
        <NavLink to={ROUTER.tablets} className={styles.header__link}>
          Tablets
        </NavLink>
        <NavLink to={ROUTER.watches} className={styles.header__link}>
          Watches
        </NavLink>
      </nav>

      <div className={styles.header__icons}>
        {items.length > 0 && (
          <div className={styles.header__heart}>
            <Counter count={items.length} />
          </div>
        )}

        <NavLink to="/cart" className={styles.header__item}>
          <div className={styles.header__cart}></div>
        </NavLink>

        {isAuth && <div className={styles.header__signIn}></div>}

        <NavLink to="/login" className={styles.header__item}>
          <div className={styles.header__login}></div>
        </NavLink>
      </div>
    </div>
  );
};
