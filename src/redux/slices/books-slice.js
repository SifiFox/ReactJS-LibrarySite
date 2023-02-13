import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooksList(state, action) {
      const res = action.payload;
    },
  },
});

export const books = booksSlice.reducer;
export const { setBooksList } = booksSlice.actions;
