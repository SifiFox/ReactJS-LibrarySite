import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  booksList: [],
  sortAsc: true,
};

const booksListSlice = createSlice({
  name: 'booksList',
  initialState,
  reducers: {
    setBooksList(state, action) {
      state.booksList = action.payload;
    },

    booksSort(state) {
      state.sortAsc = !state.sortAsc;
    },
  },
});

export const booksList = booksListSlice.reducer;
export const { setBooksList, booksSort } = booksListSlice.actions;
