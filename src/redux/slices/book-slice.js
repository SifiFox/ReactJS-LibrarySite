import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  burgerActive: false,
  bookActive: false,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setbookActive(state, action) {
      state.burgerActive = !state.burgerActive;
      state.bookActive = !state.bookActive;
    },
  },
});

export const book = bookSlice.reducer;
export const { setbookActive, hidebook, showbook } = bookSlice.actions;
