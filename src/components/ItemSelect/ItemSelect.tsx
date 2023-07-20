import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { setPerPage } from 'features/reducers/paginationSlice';

import styles from './ItemSelect.module.scss';

interface Props {
  count: number;
}

export const ItemSelect: React.FC<Props> = ({ count }) => {
  const { perPage } = useAppSelector((state) => state.paginationReducer);
  const dispatch = useAppDispatch();
  const dropdown = useRef<HTMLSelectElement>(null);

  const countList = ['8', '16', '24', 'All'];
  const isCorrect = perPage === '8' || perPage === '16' || perPage === '24';

  const handleAddrTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setPerPage(event.target.value));
    if (event.target.value === 'All') {
      dispatch(setPerPage(count.toString()));
    }
    if (dropdown.current) {
      dropdown.current.blur();
    }
  };

  return (
    <div>
      <p className={styles.title_select_text}>Items on page</p>

      <select
        value={isCorrect ? perPage : 'All'}
        ref={dropdown}
        onChange={(e) => handleAddrTypeChange(e)}
        className={styles.title_select}
      >
        {countList.map((item, key) => (
          <option key={key} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
