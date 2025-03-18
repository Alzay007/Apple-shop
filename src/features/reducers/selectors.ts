import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectIsCardInArray = createSelector(
  [selectCartItems, (_, id: string) => id],
  (items, id) => items.includes(id)
);

const selectWishlistItems = (state: RootState) =>
  state.wishlistReducer.favItems;

export const selectIsCardInFavouriteArray = createSelector(
  [selectWishlistItems, (_, id: string) => id],
  (favItems, id) => favItems.includes(id)
);
