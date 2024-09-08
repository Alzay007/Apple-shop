import { configureStore } from '@reduxjs/toolkit';
import goodsReducer from '../reducers/goodsSlice';
import cartReducer from '../reducers/cartSlice';
import wishlistReducer from '../reducers/wishlistSlice';
import userReducer from '../reducers/userSlice';
import modalReducer from '../reducers/modalSlice';
import paginationReducer from '../reducers/paginationSlice';

export const store = configureStore({
  reducer: {
    goodsReducer,
    cartReducer,
    wishlistReducer,
    userReducer,
    modalReducer,
    paginationReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
