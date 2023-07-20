import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { resetPagination } from 'features/reducers/paginationSlice';

import { Loader } from 'components/Loader';
import { GoodsList } from 'components/GoodsList';
import { Title } from 'components/Title';
import { SortType } from 'types/SortType';
import { sortItems } from 'helpers/sortFunc';
import { AuthSnackbar } from 'components/AuthSnackBar';

import styles from './GoodsPage.module.scss';

interface Props {
  title: string;
  category: string;
}

export const GoodsPage: React.FC<Props> = ({ title, category }) => {
  const dispatch = useAppDispatch();
  const { isLoading, goods } = useAppSelector((state) => state.goodsReducer);
  const { perPage } = useAppSelector((state) => state.paginationReducer);
  const [sortBy, setSortBy] = useState<SortType>(SortType.DEFAULT);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(resetPagination());
  }, [category, perPage]);

  const handleStatus = (value: SortType) => {
    setSortBy(value);
  };

  const goodsList = goods.filter((item) => item.category === category);

  const sortedGoods = sortItems(goodsList, sortBy);

  return (
    <section className={styles.goods}>
      <Title title={title} count={goodsList.length} />

      {isLoading ? (
        <Loader />
      ) : (
        <GoodsList
          itemsList={sortedGoods}
          sortBy={sortBy}
          handleStatus={handleStatus}
        />
      )}

      <AuthSnackbar />
    </section>
  );
};
