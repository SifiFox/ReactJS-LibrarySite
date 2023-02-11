import React from 'react';
import { Link } from 'react-router-dom';

import { BookCard } from '../book-component';
import data from '../../assets/books-template.json';

export function BooksList({ listType }) {
  return (
    <React.Fragment>
      {data.map((book) => (
        <Link key={book.id} to={`/book/${book.id}`}>
          <BookCard
            key={book.id}
            author={book.author}
            year={book.year}
            title={book.title}
            bookedTill={book.bookedTill}
            isBooked={book.isBooked}
            rating={book.rating}
            listType={listType}
            image={book.image}
          />
        </Link>
      ))}
    </React.Fragment>
  );
}
