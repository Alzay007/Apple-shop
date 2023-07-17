import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ProductType } from 'types/ProductType';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { useAuth } from 'features/hooks/useAuth';
import { openSnackBar } from 'features/reducers/snackSlice';
import { addItem, removeItem } from 'features/reducers/cartSlice';

import styles from './ColorSize.module.scss';

interface Props {
  product: ProductType | undefined;
}

type ColorMapping = {
  [key: string]: string;
};

const colorMappings: ColorMapping = {
  rosegold: '#e0bfb8',
  spacegray: '#717378',
  midnight: '#03012d',
  starlight: '#f8f9ec',
  spaceblack: '#333334',
  graphite: '#53565b',
  sierrablue: '#69abce',
  midnightgreen: '#004953'
};

export const ColorSize: React.FC<Props> = ({
  product: {
    color,
    capacity,
    colorsAvailable,
    capacityAvailable,
    namespaceId,
    priceRegular,
    screen,
    resolution,
    processor,
    ram
  } = {}
}) => {
  const dispatch = useAppDispatch();
  const { goods } = useAppSelector((state) => state.goodsReducer);
  const { items } = useAppSelector((state) => state.cartReducer);

  const { itemId } = useParams();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const [isActiveColor = color, setIsActiveColor] = useState(color);
  const [isActiveCapacity = capacity, setIsActiveCapacity] = useState(capacity);

  const currentProduct = useMemo(
    () => goods.find((item) => item.itemId === itemId),
    [goods, itemId]
  );

  const currentId = useMemo(
    () => (currentProduct ? currentProduct.id : ''),
    [currentProduct]
  );

  const isCardInArray = useMemo(
    () => items.includes(currentId),
    [items, currentId]
  );

  const handleSetCardInData = () => {
    if (!isCardInArray) {
      dispatch(addItem(currentId));
    } else {
      dispatch(removeItem(currentId));
    }
  };

  const handleSetOpenSnack = () => {
    dispatch(openSnackBar());
  };

  const handleColorClick = (color: string) => {
    setIsActiveColor(color);
    navigate(`../${namespaceId}-${isActiveCapacity?.toLowerCase()}-${color}`);
  };

  const handleMemoryClick = (memory: string) => {
    setIsActiveCapacity(memory);
    navigate(`../${namespaceId}-${memory.toLowerCase()}-${isActiveColor}`);
  };

  return (
    <div className={styles.ActionBlock}>
      <div className={styles.ColorBlock}>
        <p className={styles.ActionBlock__option_text}>Available Colors</p>

        <ul className={styles.ColorBlock__list}>
          {colorsAvailable?.map((color) => (
            <li
              key={color}
              onClick={() => handleColorClick(color)}
              className={
                isActiveColor === color
                  ? styles.ColorBlock__list__item_active
                  : styles.ColorBlock__list__item
              }
            >
              <div
                className={styles.ColorBlock__list__item__link}
                style={{ backgroundColor: colorMappings[color] || color }}
              ></div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.ActionBlock__underline}></div>

      <div className={styles.CapacityBlock}>
        <span className={styles.ActionBlock__option_text}>Select capacity</span>

        <ul className={styles.CapacityBlock__list}>
          {capacityAvailable?.map((capacity) => (
            <li
              key={capacity}
              onClick={() => handleMemoryClick(capacity)}
              className={
                isActiveCapacity === capacity
                  ? styles.CapacityBlock__list__item_active
                  : styles.CapacityBlock__list__item
              }
            >
              <div
                className={
                  isActiveCapacity === capacity
                    ? styles.CapacityBlock__list__item__link_active
                    : styles.CapacityBlock__list__item__link
                }
              >
                {capacity}
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.action_block__underline}></div>
      </div>

      <div className={styles.ActionBlock__underline}></div>

      <div className={styles.characteristic}>
        <div className={styles.characteristic__price}>
          <span
            className={styles.characteristic__newPrice}
          >{`$${priceRegular}`}</span>
        </div>

        <div className={styles.characteristic__buttons}>
          <button
            className={classNames(styles.characteristic__checkout, {
              [styles.characteristic__uncheckout]: isCardInArray
            })}
            onClick={isAuth ? handleSetCardInData : handleSetOpenSnack}
          >
            {isCardInArray ? 'Added' : 'Add to cart'}
          </button>
        </div>

        <div className={styles.characteristic__description}>
          <span className={styles.characteristic__text}>Screen</span>
          <span className={styles.characteristic__value}>{screen}</span>
        </div>

        <div className={styles.characteristic__description}>
          <span className={styles.characteristic__text}>Resolution</span>
          <span className={styles.characteristic__value}>{resolution}</span>
        </div>

        <div className={styles.characteristic__description}>
          <span className={styles.characteristic__text}>Processor</span>
          <span className={styles.characteristic__value}>{processor}</span>
        </div>

        <div className={styles.characteristic__description}>
          <span className={styles.characteristic__text}>RAM</span>
          <span className={styles.characteristic__value}>{ram}</span>
        </div>
      </div>
    </div>
  );
};
