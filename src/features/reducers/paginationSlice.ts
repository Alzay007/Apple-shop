import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  page: number;
  perPage: string;
}

const initialState: PaginationState = {
  page: 1,
  perPage: '8'
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPerPage: (state, action: PayloadAction<string>) => {
      state.perPage = action.payload;
    },
    resetPagination: (state) => {
      state.page = 1;
    }
  }
});

export const { setPage, setPerPage, resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;
