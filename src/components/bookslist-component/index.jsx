import React from 'react';
import { Link } from 'react-router-dom';

import { useGetBooksQuery } from '../../redux/slices/api-slice';

import { BookCard } from '../book-component';
import dataTest from '../../assets/books-data.json';

export function BooksList({ listType }) {
  const { data = [], isLoading } = useGetBooksQuery();

  return (
    <React.Fragment>
      {data.map((book) => (
        <Link key={book.id} to={`/books/all/${book.id}`}>
          <BookCard
            key={book.id}
            title={book.title}
            year={book.issueYear}
            author={book.authors}
            rating={book.rating}
            image={book.image}
            listType={listType}
          />
        </Link>
      ))}
    </React.Fragment>
  );
}
