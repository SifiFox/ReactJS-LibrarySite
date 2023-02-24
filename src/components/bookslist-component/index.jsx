import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BookCard } from '../book-component';
import { SearchEmpty } from '../search-empty-component';

export function BooksList({ listType }) {
  const books = useSelector((state) => state.booksList.booksList);
  const sort = useSelector((state) => state.booksList.sortAsc);
  const search = useSelector((state) => state.search.searchValue);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesList.categoriesList);
  const location = useLocation();
  const [emptyText, setEmptyText] = React.useState({ text: 'По запросу ничего не найдено', testId: false });
  const currentCategory = location.pathname
    .split('/')
    .filter(Boolean)
    .filter((element) => element !== 'books')
    .join('');
  const categoryPath = categories.filter((category) => category.path === currentCategory);

  const filtredBooks = React.useCallback(() => {
    if (currentCategory === ':category') {
      return books;
    }
    if (currentCategory !== 'all') {
      return books.filter((book) => book.categories.includes(categoryPath[0].name));
    }
    return books;
  }, [books, categoryPath, currentCategory]);

  const searchedBooks = React.useMemo(() => {
    filtredBooks();
    const reg = RegExp(search.replace(/[\\^$|.*?+{}()[\]]/g, '\\$&'), 'gi');

    const template = '<b data-test-id="highlight-matches" >$&</b>';

    return search
      ? filtredBooks().reduce((acc, n) => {
          const markedTitle = n.title.replace(reg, template);
          if (markedTitle !== n.title) {
            acc.push({ ...n, markedTitle });
          }

          return acc;
        }, [])
      : filtredBooks().reduce((acc, n) => {
          const markedTitle = n.title;
          if (markedTitle !== n.body) {
            acc.push({ ...n, markedTitle });
          }

          return acc;
        }, []);
  }, [search, filtredBooks]);

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

  React.useEffect(() => {
    if (search.length !== 0) {
      setEmptyText({ text: 'По запросу ничего не найдено', testId: 'search-result-not-found' });
    } else {
      setEmptyText({ text: 'В этой категории книг ещё нет', testId: 'empty-category' });
    }
    // }, [books, sort, searchedBooks, search, filtredBooks]);
  }, [search.length]);

  return (
    <React.Fragment>
      {searchedBooks.length !== 0 ? (
        sortBooks(searchedBooks, sort).map((book) => (
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
              markedTitle={book.markedTitle}
            />
          </Link>
        ))
      ) : (
        <SearchEmpty innerText={emptyText.text} testId={emptyText.testId} />
      )}{' '}
    </React.Fragment>
  );
}
