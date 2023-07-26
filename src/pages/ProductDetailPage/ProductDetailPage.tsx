import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PhotosBlockSelecting } from 'components/PhotosBlockSelecting';
import { ColorSize } from 'components/ColorSize';
import { DetailsTitle } from 'components/DetailsTitle';
import { ProductAbout } from 'components/ProductAbout';
import { SpecsSection } from 'components/SpecsSection';
import { RecommendedGoods } from 'components/Recommended';
import { ProductType } from 'types/ProductType';
import { fetchProduct } from 'features/reducers/thunk';
import { useAppSelector } from 'features/hooks/hooks';
import { AuthSnackbar } from 'components/AuthSnackBar';
import { Loader } from 'components/Loader';

import styles from './ProductDetailPage.module.scss';

export const ProductDetailPage = () => {
  const { itemId = '' } = useParams();
  const { goods } = useAppSelector((state) => state.goodsReducer);
  const [foundProduct, setFoundProduct] = useState<ProductType>();
  const [currentImg, setCurrentImg] = useState<string>('');

  const currentProduct = useMemo(() => {
    return goods.find((product) => product.itemId === itemId);
  }, [goods, itemId]);

  const category = currentProduct ? currentProduct?.category : '';

  useEffect(() => {
    if (itemId !== '') {
      const fetchProductData = async (itemId: string) => {
        window.scrollTo(0, 0);

        try {
          const res = await fetchProduct(category, itemId.trim());

          setFoundProduct(res);
          setCurrentImg('');
        } catch (error) {
          console.log('Error');
        }
      };

      fetchProductData(itemId);
    }
  }, [itemId, category, goods]);

  return (
    <div className={styles.detail}>
      {foundProduct ? (
        <>
          <DetailsTitle category={category} name={foundProduct.name} />

          <div className={styles.detail__wrapper}>
            <PhotosBlockSelecting
              product={foundProduct}
              currentImg={currentImg}
              setCurrentImg={setCurrentImg}
            />

            <ColorSize product={foundProduct} />
          </div>

          <div className={styles.detail__desc}>
            <ProductAbout description={foundProduct.description} />

            <SpecsSection phone={foundProduct} />
          </div>

          <RecommendedGoods category={category} />

          <AuthSnackbar />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
