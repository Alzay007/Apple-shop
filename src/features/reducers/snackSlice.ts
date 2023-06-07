import { createSlice } from '@reduxjs/toolkit';

interface SnackState {
  isSnackBarOpen: boolean;
}

const initialState: SnackState = {
  isSnackBarOpen: false
};

export const snackSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openSnackBar(state) {
      state.isSnackBarOpen = true;
    },
    closeSnack(state) {
      state.isSnackBarOpen = false;
    }
  }
});

export default snackSlice.reducer;

export const { openSnackBar, closeSnack } = snackSlice.actions;
