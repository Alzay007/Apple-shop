import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
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

// firebase cart request

export const loadCartFromFirestore = createAsyncThunk(
  'cart/loadCart',
  async (userId: string, { rejectWithValue }) => {
    if (!userId || typeof userId !== 'string') {
      return rejectWithValue('Некорректный идентификатор пользователя');
    }

    try {
      const cartDocRef = doc(db, 'carts', userId);
      const docSnap = await getDoc(cartDocRef);

      if (!docSnap.exists()) {
        console.log('Document not found!');
        return rejectWithValue('Документ не найден');
      }

      const data = docSnap.data();
      return {
        items: data.cartItems || [],
        sumOfItems: data.sum || {}
      };
    } catch (error: unknown) {
      console.error('Ошибка загрузки корзины:', error);
      return rejectWithValue(
        error instanceof Error ? error.message : 'Неизвестная ошибка'
      );
    }
  }
);

// firebase wishlist request

export const loadWishListFromFirestore = createAsyncThunk(
  'wishlist/loadWishList',
  async (userId: string, { rejectWithValue }) => {
    if (!userId || typeof userId !== 'string') {
      return rejectWithValue('Invalid user ID');
    }

    try {
      const favListDocRef = doc(db, 'favlist', userId);
      const docSnap = await getDoc(favListDocRef);

      if (!docSnap.exists()) {
        return rejectWithValue('Document not found!');
      }

      const data = docSnap.data();

      return {
        items: data.favItems || []
      };
    } catch (error: unknown) {
      console.error('Error loading favorites:', error);
      return rejectWithValue(
        error instanceof Error ? error.message : 'Error loading favorites'
      );
    }
  }
);
