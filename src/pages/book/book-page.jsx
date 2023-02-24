import React from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useGetBookQuery } from '../../redux/slices/api-slice';

import { Header } from '../../components/header-component';
import { Breadcrumbs } from '../../components/breadcrumbs-component';
import { Preloader } from '../../components/preload-component';
import { Error } from '../../components/error-component';

import { Footer } from '../../components/footer-component';
import { BookDetailsInfo } from '../../components/book-details/book-details-info';
import { BookDetailsReviews } from '../../components/book-details/book-details-reviews';
import { hideLoader } from '../../redux/slices/loader-slice';

export function BookPage() {
  const bookId = useParams().id;
  const { data = [], isLoading, error } = useGetBookQuery(bookId);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isLoading) {
      dispatch(hideLoader());
    }
  }, [isLoading, dispatch]);

  return (
    <>
      {isLoading && !error && <Preloader />}

      <div className='wrapper'>
        {error && <Error />}

        <Header />
        {!isLoading && !error && <Breadcrumbs title={data.title} />}
        <div className='book-details__content'>
          {!isLoading && !error && (
            <BookDetailsInfo
              description={data.description}
              image={data.images}
              title={data.title}
              author={data.authors}
              year={data.issueYear}
            />
          )}

          {!isLoading && !error && (
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
