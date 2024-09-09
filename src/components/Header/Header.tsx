import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Counter } from '../Counter';
import { useAppSelector } from 'features/hooks/hooks';
import { useAuth } from 'features/hooks/useAuth';
import useModalHandler from 'hooks/useModalHandler';

import styles from './Header.module.scss';
import logo from 'assets/icons/logo.png';

export const ROUTER = {
  home: '/',
  laptops: '/laptops',
  phones: '/phones',
  tablets: '/tablets',
  watches: '/watches',
  wishlist: '/wishlist',
  checkout: '/checkout',
  cart: '/cart',
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
  const { items } = useAppSelector((state) => state.cartReducer);
  const { favItems } = useAppSelector((state) => state.wishlistReducer);
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { handleOpenModal } = useModalHandler();

  const handleWishlistClick = () => {
    if (isAuth) {
      navigate('/wishlist');
    } else {
      handleOpenModal();
    }
  };

  const handlerClick = (value: boolean) => setBurgerMenuSelected(!value);

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
        <div className={styles.header__item} onClick={handleWishlistClick}>
          {isAuth && favItems.length > 0 && (
            <div className={styles.header__heart}>
              <Counter count={favItems.length} />
            </div>
          )}
          <div className={styles.header__fav}></div>
        </div>

        <div className={styles.header__item}>
          {items.length > 0 && (
            <div className={styles.header__heart}>
              <Counter count={items.length} />
            </div>
          )}
          <NavLink to="/cart" className={styles.header__cart}></NavLink>
        </div>

        {isAuth && <div className={styles.header__signIn}></div>}

        <button
          className={styles.header__item}
          onClick={() => handleOpenModal()}
        >
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
