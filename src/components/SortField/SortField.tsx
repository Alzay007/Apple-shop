import { SortType } from 'types/SortType';

import styles from './SortField.module.scss';

interface Props {
  sortBy: SortType;
  handleStatus: (value: SortType) => void;
}

export const SortField: React.FC<Props> = ({ sortBy, handleStatus }) => {
  return (
    <div className={styles.field}>
      <p className={styles.field__title}>Sort by</p>

      <select
        value={sortBy}
        onChange={(event) => handleStatus(event.target.value as SortType)}
        className={styles.field__select}
      >
        <option value={SortType.DEFAULT}>Default</option>
        <option value={SortType.LOW}>Low price</option>
        <option value={SortType.HIGH}>High price</option>
        <option value={SortType.RATING}>Rating</option>
      </select>
    </div>
  );
};
