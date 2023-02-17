import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://strapi.cleverland.by',
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => `/api/boosks`,
    }),

    getBook: builder.query({
      query: (id) => `/api/books/${id}`,
    }),
    getCategories: builder.query({
      query: () => `/api/categories`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery, useGetCategoriesQuery } = booksApi;
