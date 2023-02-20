import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
};

const booksListSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooksList(state, action) {
      state.books = action.payload;
    },

    booksSort(state) {
      console.log(state.books);
    },
  },
});

export const booksList = booksListSlice.reducer;
export const { setBooksList, booksSort } = booksListSlice.actions;
