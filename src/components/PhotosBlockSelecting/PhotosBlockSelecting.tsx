import { ProductType } from 'types/ProductType';
import { BASE_URL } from 'features/reducers/thunk';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import styles from './PhotosBlockSelecting.module.scss';

interface Props {
  product: ProductType | undefined;
  currentImg: string;
  setCurrentImg: React.Dispatch<React.SetStateAction<string>>;
}

export const PhotosBlockSelecting: React.FC<Props> = ({
  product,
  currentImg,
  setCurrentImg
}) => {
  const images = product?.images;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setCurrentImg(event.currentTarget.getAttribute('src'));
  };

  return (
    <div className={styles.photoBlock}>
      <TransformWrapper>
        <TransformComponent>
          <img
            src={currentImg || (images && `${BASE_URL}/${images[0]}`)}
            className={styles.photoBlock__img}
          />
        </TransformComponent>
      </TransformWrapper>

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
