import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoad: true,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader(state) {
      state.isLoad = true;
    },
    hideLoader(state) {
      state.isLoad = false;
    },
  },
});

export const loader = loaderSlice.reducer;
export const { showLoader, hideLoader } = loaderSlice.actions;
