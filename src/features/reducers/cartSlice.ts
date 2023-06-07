import { Sum } from 'types/Sum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: string[];
  isModalOpen: boolean;
  sumOfItems: Sum;
}

const initialState: CartState = {
  items: [],
  isModalOpen: false,
  sumOfItems: {}
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
      const index = state.items.findIndex((id) => id === itemId);
      if (index !== -1) {
        state.items.splice(index, 1);
      }

      delete state.sumOfItems[itemId];
    },
    addItems: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
      state.isModalOpen = true;
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
    }
  }
});

export const {
  addItem,
  addItems,
  removeItem,
  clearItems,
  closeModal,
  decrementCount,
  incrementCount,
  setSumOfItems
} = cartSlice.actions;

export default cartSlice.reducer;
