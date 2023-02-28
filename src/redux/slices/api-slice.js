import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://strapi.cleverland.by',
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { jwt, user },
      } = getState();
      headers.set('Authorization', jwt ? `Bearer ${jwt}` : '');
      return headers;
    },
  }),
  tagTypes: ['books'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/api/books',
      providesTags: ['books'],
    }),

    getBook: builder.query({
      query: (id) => `/api/books/${id}`,
    }),
    getCategories: builder.query({
      query: () => '/api/categories',
    }),
    userLogin: builder.mutation({
      query: (user) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: '/api/auth/local',
        method: 'POST',
        // body: {
        //   identifier: 'sififox',
        //   password: 'lolka551',
        // },
        body: user,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useGetBookQuery, useGetCategoriesQuery, useUserLoginMutation } = booksApi;
