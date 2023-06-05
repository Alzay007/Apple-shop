import { configureStore } from '@reduxjs/toolkit';
import goodsReducer from '../reducers/goodsSlice';
import cartReducer from '../reducers/cartSlice';
import userReducer from '../reducers/userSlice';
import snackReducer from '../reducers/snackSlice';

export const store = configureStore({
  reducer: {
    goodsReducer,
    cartReducer,
    userReducer,
    snackReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
