import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: string[];
  isModalOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isModalOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((id) => id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    addItems: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    }
  },
});

export const {
  addItem,
  addItems,
  removeItem,
  clearItems,
  closeModal
} = cartSlice.actions;

export default cartSlice.reducer;
