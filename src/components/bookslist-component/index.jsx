import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BookCard } from '../book-component';
import { booksSort } from '../../redux/slices/bookslist-slice';

export function BooksList({ listType }) {
  const books = useSelector((state) => state.booksList.books);

  const dispatch = useDispatch;

  React.useEffect(() => {
    dispatch(booksSort());
  }, [books, dispatch]);

  return (
    <React.Fragment>
      {books.map((book) => (
        <Link key={book.id} to={`/books/all/${book.id}`}>
          <BookCard
            key={book.id}
            title={book.title}
            year={book.issueYear}
            author={book.authors}
            rating={book.rating}
            image={book.image}
            booking={book.booking}
            listType={listType}
          />
        </Link>
      ))}
    </React.Fragment>
  );
}
