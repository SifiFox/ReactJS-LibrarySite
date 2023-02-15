import React from 'react';

import { useParams, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useGetBookQuery } from '../../redux/slices/api-slice';

import { Header } from '../../components/header-component';
import { Breadcrumbs } from '../../components/breadcrumbs-component';
import { Preloader } from '../../components/preload-component';
import { Error } from '../../components/error-component';

import { Footer } from '../../components/footer-component';
import { BookDetailsInfo } from '../../components/book-details/book-details-info';
import { BookDetailsReviews } from '../../components/book-details/book-details-reviews';
import { hideLoader } from '../../redux/slices/loader-slice';

import dataDemo from '../../assets/books-template.json';
import dataTest from '../../assets/books-data.json';

export function BookPage() {
  const paramsList = useParams();
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
  const { data = [], isLoading, error } = useGetBookQuery(bookId);

  const dispatch = useDispatch();

  const isLoad = useSelector((state) => state.loader.isLoad);

  // const book = dataDemo.filter((item) => item.id === bookId).reduce((item) => item);

  if (isLoading) {
    console.log('is loading');
  } else {
    console.log(data);
  }

  React.useEffect(() => {
    if (!isLoading) {
      dispatch(hideLoader());
    }
  }, [isLoading, dispatch, isLoad]);

  return (
    <>
      {isLoad && !error && <Preloader />}

      <div className='wrapper'>
        {error && <Error />}

        <Header />
        <Breadcrumbs title={data.title} />
        <div className='book-details__content'>
          {!isLoad && !error && (
            <BookDetailsInfo
              description={data.description}
              image={data.images}
              title={data.title}
              author={data.authors}
              year={data.issueYear}
            />
          )}

          {!isLoad && !error && (
            <BookDetailsReviews
              isbn={data.ISBN}
              booking={data.booking}
              comments={data.comments}
              cover={data.cover}
              issueYear={data.issueYear}
              pages={data.pages}
              producer={data.producer}
              publish={data.publish}
              weight={data.weight}
              rating={data.rating}
              format={data.format}
              categories={data.categories}
            />
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
