import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchActive: false,
  searchValue: '',
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

    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const search = searchSlice.reducer;
export const { showSearch, hideSearch, setSearchValue } = searchSlice.actions;
