import { Sum } from 'types/Sum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { loadCartFromFirestore } from './thunk';

interface CartState {
  items: string[];
  isModalOpen: boolean;
  isCartLoading: boolean;
  error: string | null;
  sumOfItems: Sum;
  isVisibleListLoaded: boolean;
}

const initialState: CartState = {
  items: [],
  isModalOpen: false,
  isCartLoading: true,
  error: null,
  sumOfItems: {},
  isVisibleListLoaded: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((id) => id !== itemId);

      delete state.sumOfItems[itemId];
    },
    addItems: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
      state.sumOfItems = {};
    },
    clearCart: (state) => {
      state.items = [];
      state.sumOfItems = {};
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setSumOfItems: (state, action) => {
      const { id, price, count } = action.payload;
      state.sumOfItems[id] = price * count;
    },
    incrementCount: (state, action) => {
      const { id, price, count } = action.payload;
      state.sumOfItems[id] = price * (count + 1);
      state.items.push(id);
    },
    decrementCount: (state, action) => {
      const { id, price, count } = action.payload;
      state.sumOfItems[id] = price * (count - 1);
      const index = state.items.indexOf(id);
      if (index > -1) {
        state.items.splice(index, 1);
      }
    },
    saveCartToFirestore: (state, action: PayloadAction<string>) => {
      const userId = action.payload;

      const cartDocRef = doc(db, 'carts', userId);

      setDoc(
        cartDocRef,
        {
          cartItems: state.items
        },
        { merge: true }
      )
        .then(() => {
          console.log('Cart successfully saved!');
        })
        .catch((error) => {
          console.error('Error saving basket:', error);
        });
    },
    setVisibleListLoaded: (state) => {
      state.isVisibleListLoaded = true;
      state.isCartLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCartFromFirestore.pending, (state) => {
        state.isCartLoading = true;
        state.error = null;
      })
      .addCase(loadCartFromFirestore.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.sumOfItems = action.payload.sumOfItems;
        state.isCartLoading = false;
      })
      .addCase(loadCartFromFirestore.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = (action.payload as string) || 'Неизвестная ошибка';
      });
  }
});

export const {
  addItem,
  addItems,
  removeItem,
  clearItems,
  clearCart,
  closeModal,
  decrementCount,
  incrementCount,
  setSumOfItems,
  setVisibleListLoaded,
  saveCartToFirestore
} = cartSlice.actions;

export default cartSlice.reducer;
