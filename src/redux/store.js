import { configureStore } from '@reduxjs/toolkit';

import { menu } from './slices/menu-slice';
import { search } from './slices/search-slice';
import { book } from './slices/book-slice';
import { books } from './slices/books-slice';
import { booksApi } from './slices/api-slice';

export const store = configureStore({
  reducer: {
    menu,
    search,
    book,
    books,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware),
});
