import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  favItems: string[];
}

const initialState: WishlistState = {
  favItems: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addFavItem: (state, action: PayloadAction<string>) => {
      state.favItems.push(action.payload);
    },
    removeFavItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.favItems.findIndex((id) => id === itemId);
      if (index !== -1) {
        state.favItems.splice(index, 1);
      }
    },
    addFavItems: (state, action: PayloadAction<string[]>) => {
      state.favItems = action.payload;
    },
    clearWishlist: (state) => {
      state.favItems = [];
    }
  }
});

export const { addFavItem, addFavItems, removeFavItem, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
