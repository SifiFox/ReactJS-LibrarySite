import React from 'react';

import { useNavigate, useLocation, redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetBooksQuery, useGetCategoriesQuery } from '../../redux/slices/api-slice';

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
  const [skip, setSkip] = React.useState(true);
  const burgerRef = React.useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoad = useSelector((state) => state.loader.isLoad);
  const { data = [], refetch, isLoading, error } = useGetBooksQuery(1, { skip });
  const categories = useGetCategoriesQuery(1, { skip });

  React.useEffect(() => {
    if (isLoad) {
      dispatch(showLoader());
    }
    if (localStorage.getItem('jwt') || localStorage.getItem('jwt') !== 'null') {
      setSkip(false);
    }
    if (location.pathname === '/books/') {
      navigate('/books/all');
    }
    if (!localStorage.getItem('jwt') || localStorage.getItem('jwt') === 'null') {
      navigate('/auth');
    }
    if (location.pathname === '/') {
      navigate('/books/all');
    }
    if (location.pathname === '/books/:category') {
      navigate('/books/all');
    }

    // dispatch(showLoader());

    // if (isLoading || categories.isLoading) {
    //   dispatch(showLoader());
    // }
    if (isLoading) {
      dispatch(showLoader());
    }

    if (!isLoading) {
      dispatch(setBooksList(data));
      dispatch(hideLoader());
    }

    // if (!isLoading && !categories.isLoading) {
    //   dispatch(setBooksList(data));
    //   dispatch(hideLoader());
    // }

    // if (error || categories.error) {
    //   console.log(error);
    //   console.log(categories.error);
    //   dispatch(showError());
    // }
  }, [location, navigate, isLoading, dispatch, isLoad, error, data, refetch]);

  if (!localStorage.getItem('jwt') || localStorage.getItem('jwt') === 'null') {
    return navigate('/auth');
  }

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
