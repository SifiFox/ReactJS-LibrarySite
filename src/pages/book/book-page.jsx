import React from 'react';

import { useParams, useLocation } from 'react-router-dom';

import { useGetBookQuery } from '../../redux/slices/api-slice';

import { Header } from '../../components/header-component';
import { Breadcrumbs } from '../../components/breadcrumbs-component';
import { Footer } from '../../components/footer-component';
import { BookDetailsInfo } from '../../components/book-details/book-details-info';
import { BookDetailsReviews } from '../../components/book-details/book-details-reviews';

import dataDemo from '../../assets/books-template.json';
import dataTest from '../../assets/books-data.json';

export function BookPage() {
  const paramsList = useParams();
  // console.log(paramsList);

  // ISBN
  // authors - array
  // booking - null
  // categories - array
  // comments - array
  // cover string
  // delivery - null
  // description
  // format string
  // images - array
  // issueYear
  // pages
  // producer - издательство
  // publish
  // rating
  // title
  // weight

  const bookId = useParams().id;
  const { data = [], isLoading } = useGetBookQuery(bookId);

  // const book = dataDemo.filter((item) => item.id === bookId).reduce((item) => item);

  if (isLoading) {
    console.log('is loading');
  } else {
    // console.log(data);
    // console.log(bookId);
  }

  return (
    <div className='wrapper'>
      <Header />
      <Breadcrumbs title={data.title} />
      <div className='book-details__content'>
        {!isLoading && (
          <BookDetailsInfo
            description={data.description}
            image={data.images}
            // testimage={data.images}
            title={data.title}
            author={data.authors}
            year={data.issueYear}
          />
        )}

        {/* <BookDetailsInfo data={data} /> */}
        {/* <BookDetailsReviews rating={book.rating} /> */}
      </div>
      <Footer />
    </div>
  );
}
