import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetBooksQuery } from '../../redux/slices/api-slice';

import { Header } from '../../components/header-component';
import { Menu } from '../../components/menu-component';
import { Books } from '../../components/books-component';
import { Footer } from '../../components/footer-component';
import { Preloader } from '../../components/preload-component';
import { Error } from '../../components/error-component';
import { hideLoader, showLoader, showError } from '../../redux/slices/loader-slice';
import { setBooksList } from '../../redux/slices/bookslist-slice';
import { hideMenu } from '../../redux/slices/menu-slice';

export function MainPage() {
  const isError = useSelector((state) => state.loader.isError);

  const dispatch = useDispatch();

  const burgerRef = React.useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const { data = [], refetch, isLoading, error } = useGetBooksQuery();

  React.useEffect(() => {
    dispatch(showLoader());
    refetch();

    if (!sessionStorage.getItem('jwt') || sessionStorage.getItem('jwt') === 'null') {
      navigate('/auth');
      return;
    }
    if (location.pathname === '/') {
      navigate('/books/all');
    }
    if (location.pathname === '/books/:category') {
      navigate('/books/all');
    }

    if (!isLoading) {
      dispatch(hideLoader());
      dispatch(setBooksList(data));
    }

    if (error) {
      dispatch(showError());
    }
  }, [location, navigate, isLoading, dispatch, error, data, refetch]);

  return (
    <>
      {isLoading && !error && <Preloader />}

      <div className='wrapper'>
        {isError && <Error />}

        <Header burgerRef={burgerRef} />

        <div className='content'>
          <Menu burgerRef={burgerRef} />

          {!isLoading && !isError && <Books burgerRef={burgerRef} />}
        </div>

        <Footer />
      </div>
    </>
  );
}
