import { NavLink } from 'react-router-dom';
import { Counter } from '../Counter/Counter';
import { useAppSelector } from 'features/hooks/hooks';
import { useAuth } from 'features/hooks/useAuth';
import useModalHandler from 'hooks/useModalHandler';

import styles from './BurgerMenu.module.scss';
import logo from 'assets/icons/logo.png';
import cross from 'assets/icons/cross.svg';
import bag from 'assets/icons/bag.svg';
import login from 'assets/icons/login.svg';

interface Props {
  setBurgerMenuSelected: (value: boolean) => void;
  burgerMenuSelected: boolean;
}

export const BurgerMenu: React.FC<Props> = ({
  setBurgerMenuSelected,
  burgerMenuSelected
}) => {
  const { items } = useAppSelector((state) => state.cartReducer);
  const { isAuth } = useAuth();
  const { handleOpenModal } = useModalHandler();

  const handlerClick = (value: boolean) => {
    setBurgerMenuSelected(!value);
  };

  return (
    <div className={styles.burger}>
      <div className={styles.burger__top}>
        <div className={styles.burger__logo}>
          <NavLink to="/">
            <img
              src={logo}
              alt="logo"
              onClick={() => handlerClick(burgerMenuSelected)}
            />
          </NavLink>
        </div>
        <div
          className={styles.burger__cross}
          onClick={() => handlerClick(burgerMenuSelected)}
        >
          <img src={cross} alt="cross" />
        </div>
      </div>

      <nav>
        <ul className={styles.burger__list}>
          <li className={styles.burger__item}>
            <NavLink
              to="/"
              className={styles.burger__link}
              onClick={() => handlerClick(burgerMenuSelected)}
            >
              home
            </NavLink>
          </li>
          <li className={styles.burger__item}>
            <NavLink
              to="/laptops"
              className={styles.burger__link}
              onClick={() => handlerClick(burgerMenuSelected)}
            >
              laptops
            </NavLink>
          </li>
          <li className={styles.burger__item}>
            <NavLink
              to="/phones"
              className={styles.burger__link}
              onClick={() => handlerClick(burgerMenuSelected)}
            >
              phones
            </NavLink>
          </li>
          <li className={styles.burger__item}>
            <NavLink
              to="/tablets"
              className={styles.burger__link}
              onClick={() => handlerClick(burgerMenuSelected)}
            >
              tablets
            </NavLink>
          </li>
          <li
            className={styles.burger__item}
            onClick={() => handlerClick(burgerMenuSelected)}
          >
            <NavLink to="/watches" className={styles.burger__link}>
              watches
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.burger__bottom}>
        <button
          className={styles.burger__login}
          onClick={() => handleOpenModal()}
        >
          <img
            src={login}
            alt="login"
            onClick={() => handlerClick(burgerMenuSelected)}
          />
          {isAuth && <div className={styles.burger__signIn}></div>}
        </button>

        <div className={styles.burger__divider}></div>

        <NavLink
          to="/cart"
          className={styles.burger__basket}
          onClick={() => handlerClick(burgerMenuSelected)}
        >
          <img
            src={bag}
            alt="basket"
            onClick={() => handlerClick(burgerMenuSelected)}
          />

          {items.length > 0 && (
            <div className={styles.burger__count}>
              <Counter count={items.length} />
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};
