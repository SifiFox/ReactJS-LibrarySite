import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: sessionStorage.getItem('user') ? sessionStorage.getItem('user') : null,
    jwt: sessionStorage.getItem('jwt') ? sessionStorage.getItem('jwt') : null,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      if (action.payload.data.user) {
        state.user = action.payload.data.user;
        state.jwt = action.payload.data.jwt;
        sessionStorage.setItem('user', JSON.stringify(action.payload.data.user));
        sessionStorage.setItem('jwt', action.payload.data.jwt);
      } else {
        console.log(action.payload);
      }
    },
    logOut: (state) => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('jwt');
      state.user = null;
      state.jwt = null;
    },
  },
});

export const auth = authSlice.reducer;
export const { setToken, logOut } = authSlice.actions;
