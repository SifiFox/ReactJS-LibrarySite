import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoriesList: [],
};

const categoriesListSlice = createSlice({
  name: 'categoriesList',
  initialState,
  reducers: {
    setCategoriesList(state, action) {
      state.categoriesList = action.payload;
    },
  },
});

export const categoriesList = categoriesListSlice.reducer;
export const { setCategoriesList } = categoriesListSlice.actions;
