import { Product } from '../../types/Product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GoodsState {
  goods: Product[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: GoodsState = {
  goods: [],
  isLoading: false,
  isError: false
};

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    goodsFetching(state) {
      state.isLoading = true;
    },
    goodsFetchingSuccess(state, action: PayloadAction<Product[]>) {
      state.isLoading = false;
      state.goods = action.payload;
    },
    goodsFetchingError(state) {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export default goodsSlice.reducer;

export const { goodsFetching, goodsFetchingSuccess, goodsFetchingError } =
  goodsSlice.actions;
