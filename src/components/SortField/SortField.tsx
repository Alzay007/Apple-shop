import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SortType } from 'types/SortType';

import styles from './SortField.module.scss';

interface Props {
  sortBy: SortType;
  handleStatus: (value: SortType) => void;
}

export const SortField: React.FC<Props> = ({ sortBy, handleStatus }) => {
  return (
    <div className={styles.field}>
      <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
        <InputLabel id="demo-select-small" style={{ zIndex: 0 }}>
          Sort By
        </InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={sortBy}
          label="sort"
          onChange={(event) => handleStatus(event.target.value as SortType)}
        >
          <MenuItem value={SortType.DEFAULT}>
            <em>Default</em>
          </MenuItem>
          <MenuItem value={SortType.LOW}>Low price</MenuItem>
          <MenuItem value={SortType.HIGH}>High price</MenuItem>
          <MenuItem value={SortType.RATING}>Rating</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
