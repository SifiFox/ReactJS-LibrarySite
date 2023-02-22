import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BookCard } from '../book-component';
// import { booksSort } from '../../redux/slices/bookslist-slice';

export function BooksList({ listType }) {
  const books = useSelector((state) => state.booksList.booksList);
  const sort = useSelector((state) => state.booksList.sortAsc);

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categoriesList.categoriesList);

  const location = useLocation();
  const currentCategory = location.pathname
    .split('/')
    .filter(Boolean)
    .filter((element) => element !== 'books')
    .join('');

  const categoryPath = categories.filter((category) => category.path === currentCategory);
  const filtredBooks = () => {
    if (currentCategory === ':category') {
      return books;
    }
    if (currentCategory !== 'all') {
      return books.filter((book) => book.categories.includes(categoryPath[0].name));
    }

    return books;
  };

  function sortBooks(array, sort) {
    if (sort === true) {
      return [...array].sort((a, b) => {
        if (!a.rating && b.rating) return 1;
        if (!b.rating && a.rating) return -1;
        if (!b.rating && !a.rating) return 0;

        return a.rating && b.rating && b.rating >= a.rating ? 1 : -1;
      });
    }
    return [...array].sort((a, b) => {
      if (!a.rating && b.rating) return -1;
      if (!b.rating && a.rating) return 1;
      if (!b.rating && !a.rating) return 0;

      return b.rating && a.rating && a.rating >= b.rating ? 1 : -1;
    });
  }

  React.useEffect(() => {}, [books, dispatch, sort]);

  return (
    <React.Fragment>
      {sortBooks(filtredBooks(), sort).map((book) => (
        <Link key={book.id} to={`/books/${currentCategory}/${book.id}`}>
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
