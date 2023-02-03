import { createSlice } from '@reduxjs/toolkit';
import { loadAuthState } from '../../hooks/localstorage';

const token = loadAuthState();

const initialState = {
  token,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { token } }
    ) => {
      state.token = token;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectUserToken = (state) => state.auth.token;
