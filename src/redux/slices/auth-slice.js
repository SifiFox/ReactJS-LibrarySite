import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: sessionStorage.getItem('user') ? sessionStorage.getItem('user') : null,
    jwt: sessionStorage.getItem('jwt') ? sessionStorage.getItem('jwt') : null,
  },
  reducers: {
    setToken: (state, action) => {
      state.user = action.payload.data.user;
      state.jwt = action.payload.data.jwt;
      sessionStorage.setItem('user', JSON.stringify(action.payload.data.user));
      sessionStorage.setItem('jwt', action.payload.data.jwt);
    },
    logOut: (state) => {
      console.log('logout');
      sessionStorage.setItem('user', null);
      sessionStorage.setItem('jwt', null);
    },
  },
});

export const auth = authSlice.reducer;
export const { setToken, logOut } = authSlice.actions;
