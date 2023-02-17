import { configureStore } from '@reduxjs/toolkit';
import { book } from './slices/book-slice';
import { booksApi } from './slices/api-slice';
import { loader } from './slices/loader-slice';
import { menu } from './slices/menu-slice';
import { search } from './slices/search-slice';

export const store = configureStore({
  reducer: {
    search,
    menu,
    book,
    loader,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksApi.middleware),
});
