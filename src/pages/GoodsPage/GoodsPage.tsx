import { useEffect, useState } from 'react';
import { useAppSelector } from 'features/hooks/hooks';
import styles from './GoodsPage.module.scss';

import { Loader } from 'components/Loader';
import { GoodsList } from 'components/GoodsList';
import { Title } from 'components/Title';
import { SortField } from 'components/SortField';
import { SortType } from 'types/SortType';
import { sortItems } from 'helpers/sortFunc';
import { AuthSnackbar } from 'components/AuthSnackBar';

interface Props {
  title: string;
  category: string;
}

export const GoodsPage: React.FC<Props> = ({ title, category }) => {
  const { isLoading, goods } = useAppSelector((state) => state.goodsReducer);
  const [sortBy, setSortBy] = useState<SortType>(SortType.ALL);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStatus = (value: SortType) => {
    setSortBy(value);
  };

  const goodsList = goods.filter((item) => item.category === category);

  const sortedGoods = sortItems(goodsList, sortBy);

  return (
    <section className={styles.goods}>
      {isLoading && <Loader />}

      <Title title={title} />
      <SortField sortBy={sortBy} handleStatus={handleStatus} />

      <GoodsList itemsList={sortedGoods} />
      <AuthSnackbar />
    </section>
  );
};
