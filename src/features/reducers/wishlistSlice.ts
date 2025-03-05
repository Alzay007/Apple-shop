import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { loadWishListFromFirestore } from './thunk';

interface WishlistState {
  favItems: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  favItems: [],
  isLoading: false,
  error: null
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
    },
    saveWishListToFirestore: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      const favListDocRef = doc(db, 'favlist', userId);

      setDoc(
        favListDocRef,
        {
          favItems: state.favItems
        },
        { merge: true }
      )
        .then(() => {
          console.log('Wishlist successfully saved!');
        })
        .catch((error) => {
          console.error('Error saving wishlist:', error);
        });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWishListFromFirestore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadWishListFromFirestore.fulfilled, (state, action) => {
        state.favItems = action.payload.items;
        state.isLoading = false;
      })
      .addCase(loadWishListFromFirestore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      });
  }
});

export const {
  addFavItem,
  addFavItems,
  removeFavItem,
  clearWishlist,
  saveWishListToFirestore
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
