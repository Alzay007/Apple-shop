import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux/es/exports';
import { AppDispatch, RootState } from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectItems = (state: RootState) => state.cartReducer.items;
