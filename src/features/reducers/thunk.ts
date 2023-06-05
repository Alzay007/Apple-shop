import { Product } from 'types/Product';
import axios from 'axios';
import { AppDispatch } from '../store/store';
import { goodsSlice } from './goodsSlice';

export const BASE_URL = 'https://apple-shop-ed92.onrender.com';

export const fetchGoods = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(goodsSlice.actions.goodsFetching());

    const response = await axios.get<Product[]>(BASE_URL + '/goods');

    dispatch(goodsSlice.actions.goodsFetchingSuccess(response.data));
  } catch (e) {
    dispatch(goodsSlice.actions.goodsFetchingError());
  }
};
