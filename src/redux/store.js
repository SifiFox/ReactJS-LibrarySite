import { configureStore } from '@reduxjs/toolkit';

import { menu } from './slices/menu-slice';
import { search } from './slices/search-slice';
import { book } from './slices/book-slice';

export const store = configureStore({
  reducer: {
    menu,
    search,
    book,
  },
});
