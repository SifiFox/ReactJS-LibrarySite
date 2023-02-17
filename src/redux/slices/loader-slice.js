import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoad: true,
  isError: false,
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
    showError(state) {
      state.isError = true;
    },
    hideError(state) {
      state.isError = false;
    },
  },
});

export const loader = loaderSlice.reducer;
export const { showLoader, hideLoader, showError, hideError } = loaderSlice.actions;
