import { Product } from 'types/Product';
import axios from 'axios';
import { AppDispatch } from '../store/store';
import { goodsSlice } from './goodsSlice';

export const BASE_URL = 'https://apple-store-api-95ot.onrender.com';

export const fetchGoods = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(goodsSlice.actions.goodsFetching());

    const response = await axios.get<Product[]>(BASE_URL + '/products');

    dispatch(goodsSlice.actions.goodsFetchingSuccess(response.data));
  } catch (e) {
    dispatch(goodsSlice.actions.goodsFetchingError());
  }
};

export async function fetchProduct(category: string, id: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}/categories/${category}/${id}`
    );

    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні товара:', error);
    throw error;
  }
}
