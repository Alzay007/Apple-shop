import { useEffect } from 'react';
import { Product } from 'types/Product';
import { Card } from '../Card';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { setPage, setPerPage } from 'features/reducers/paginationSlice';
import { ItemSelect } from '../ItemSelect';
import { SortField } from 'components/SortField';
import { Pagination } from '../Pagination';
import { SortType } from 'types/SortType';

import styles from './GoodsList.module.scss';

interface Props {
  itemsList: Product[];
  sortBy: SortType;
  handleStatus: (value: SortType) => void;
}

export const GoodsList: React.FC<Props> = ({
  itemsList,
  sortBy,
  handleStatus
}) => {
  const dispatch = useAppDispatch();
  const { page, perPage } = useAppSelector((state) => state.paginationReducer);

  const isCorrect = perPage === '8' || perPage === '16' || perPage === '24';

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(setPage(page));
    dispatch(setPerPage(perPage));
  }, [dispatch, page, perPage]);

  const start = (page - 1) * +perPage + 1;
  const end = Math.min(page * +perPage, itemsList.length);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <>
      <div className={styles.options}>
        <ItemSelect count={itemsList.length} />
        <SortField sortBy={sortBy} handleStatus={handleStatus} />
      </div>

      <div className={styles.container}>
        {itemsList.slice(start - 1, end).map((item) => (
          <Card key={item.id} product={item} />
        ))}
      </div>

      {isCorrect && (
        <Pagination
          total={itemsList.length}
          perPage={+perPage}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};
