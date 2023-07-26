import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isSnackBarOpen: boolean;
  isLoginModalOpen: boolean;
  isSignupModalOpen: boolean;
  burgerMenuSelected: boolean;
}

const initialState: ModalState = {
  isSnackBarOpen: false,
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  burgerMenuSelected: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSnackBar(state) {
      state.isSnackBarOpen = true;
    },
    closeSnack(state) {
      state.isSnackBarOpen = false;
    },
    openLoginModal(state) {
      state.isLoginModalOpen = true;
    },
    closeLoginModal(state) {
      state.isLoginModalOpen = false;
    },
    openSignupModal(state) {
      state.isSignupModalOpen = true;
    },
    closeSignupModal(state) {
      state.isSignupModalOpen = false;
    }
  }
});

export default modalSlice.reducer;

export const {
  openSnackBar,
  closeSnack,
  openLoginModal,
  closeLoginModal,
  openSignupModal,
  closeSignupModal
} = modalSlice.actions;
