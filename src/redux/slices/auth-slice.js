import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
    jwt: localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      if (action.payload.data.user) {
        state.user = action.payload.data.user;
        state.jwt = action.payload.data.jwt;
        localStorage.setItem('user', JSON.stringify(action.payload.data.user));
        localStorage.setItem('jwt', action.payload.data.jwt);
      } else {
        console.log(action.payload);
      }
    },
    logOut: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      state.user = null;
      state.jwt = null;
    },
  },
});

export const auth = authSlice.reducer;
export const { setToken, logOut } = authSlice.actions;
