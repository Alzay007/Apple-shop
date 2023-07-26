import { Link, NavLink } from 'react-router-dom';

import { Counter } from '../Counter';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { useAuth } from 'features/hooks/useAuth';
import { openLoginModal } from 'features/reducers/modalSlice';

import styles from './Header.module.scss';
import logo from 'assets/icons/logo.png';

export const ROUTER = {
  home: '/',
  laptops: '/laptops',
  phones: '/phones',
  tablets: '/tablets',
  watches: '/watches',
  cart: '/cart',
  signUp: '/registration',
  account: '/account',
  support: '/support',
  contacts: '/contacts',
  productDetalePage: '/:itemId'
};

interface Props {
  setBurgerMenuSelected: (value: boolean) => void;
  burgerMenuSelected: boolean;
}

export const Header: React.FC<Props> = ({
  setBurgerMenuSelected,
  burgerMenuSelected
}) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cartReducer);
  const { isAuth } = useAuth();

  const handlerClick = (value: boolean) => setBurgerMenuSelected(!value);

  const handleShowLoginModal = () => {
    dispatch(openLoginModal());
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.header__icon} />
        </Link>
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
        {isAuth && items.length > 0 && (
          <div className={styles.header__heart}>
            <Counter count={items.length} />
          </div>
        )}

        <NavLink to="/cart" className={styles.header__item}>
          <div className={styles.header__cart}></div>
        </NavLink>

        {isAuth && <div className={styles.header__signIn}></div>}

        <button className={styles.header__item} onClick={handleShowLoginModal}>
          <div className={styles.header__login}></div>
        </button>
      </div>

      <div
        className={styles.header__burger}
        onClick={() => handlerClick(burgerMenuSelected)}
      >
        <Link to="/" className={styles.burger_menu} />
      </div>
    </div>
  );
};
