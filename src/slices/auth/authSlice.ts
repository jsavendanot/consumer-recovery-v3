import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthRootType } from 'types/auth';

const initialState: AuthRootType = {
  avatar: '',
  gender: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    start(state, action: PayloadAction<AuthRootType>) {
      const { avatar, gender } = action.payload;
      state.avatar = avatar;
      state.gender = gender;
    },
    end(state) {
      state.avatar = '';
      state.gender = '';
    }
  }
});

export const { start, end } = authSlice.actions;
export default authSlice.reducer;
