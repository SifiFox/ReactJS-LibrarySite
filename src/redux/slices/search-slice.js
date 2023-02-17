import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchActive: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    showSearch(state) {
      state.searchActive = true;
    },

    hideSearch(state) {
      state.searchActive = false;
    },
  },
});

export const search = searchSlice.reducer;
export const { showSearch, hideSearch } = searchSlice.actions;
