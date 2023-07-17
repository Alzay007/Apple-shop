import { configureStore } from '@reduxjs/toolkit';
import goodsReducer from '../reducers/goodsSlice';
import cartReducer from '../reducers/cartSlice';
import userReducer from '../reducers/userSlice';
import snackReducer from '../reducers/snackSlice';
import paginationReducer from '../reducers/paginationSlice';

export const store = configureStore({
  reducer: {
    goodsReducer,
    cartReducer,
    userReducer,
    snackReducer,
    paginationReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
