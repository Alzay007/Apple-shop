import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  token: string | null;
  id: string | null;
  name: string;
  avatar: string;
}

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
  name: '',
  avatar: 'https://example.com/avatar.jpg'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    logoutUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.name = '';
    },
    setUserName(state, action) {
      state.name = action.payload;
    },
    setAvatar(state, action) {
      state.avatar = action.payload;
    }
  }
});

export default userSlice.reducer;

export const { setUser, logoutUser, setUserName, setAvatar } =
  userSlice.actions;
