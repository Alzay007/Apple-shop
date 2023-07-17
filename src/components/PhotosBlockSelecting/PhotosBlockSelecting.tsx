import styles from './PhotosBlockSelecting.module.scss';
import { useState } from 'react';
import { ProductType } from '../../types/ProductType';
import { BASE_URL } from 'features/reducers/thunk';

interface Props {
  product: ProductType | undefined;
}

export const PhotosBlockSelecting: React.FC<Props> = ({ product }) => {
  const images = product?.images;
  const [currentImg, setCurrentImg] = useState('');

  const handleClick = (event: any) => {
    setCurrentImg(event.currentTarget.getAttribute('src'));
  };

  return (
    <div className={styles.photoBlock}>
      <img
        src={currentImg || (images && `${BASE_URL}/${images[0]}`)}
        className={styles.photoBlock__img}
      />

      <div className={styles.photoBlock__sidePanel}>
        {images?.map(
          (img) =>
            img && (
              <img
                key={img}
                src={`${BASE_URL}/${img}`}
                className={styles.photoBlock__sidePanel_item}
                onClick={handleClick}
              />
            )
        )}
      </div>
    </div>
  );
};
