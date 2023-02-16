import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetBooksQuery } from '../../redux/slices/api-slice';

import { Header } from '../../components/header-component';
import { Menu } from '../../components/menu-component';
import { Books } from '../../components/books-component';
import { Footer } from '../../components/footer-component';
import { Preloader } from '../../components/preload-component';
import { setBooksList } from '../../redux/slices/books-slice';
import { Error } from '../../components/error-component';
import { hideLoader, showError } from '../../redux/slices/loader-slice';

export function MainPage() {
  const [menuIsActive, setMenuIsActive] = React.useState(false);
  const [burgerIsActive, setBurgerIsActive] = React.useState(false);

  const isLoad = useSelector((state) => state.loader.isLoad);
  const isError = useSelector((state) => state.loader.isError);

  const dispatch = useDispatch();

  const burgerRef = React.useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const { data = [], isLoading, error } = useGetBooksQuery();

  React.useEffect(() => {
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
  }, [location, navigate, isLoading, dispatch, error, data]);

  return (
    <>
      {isLoad && !error && <Preloader />}

      <div className='wrapper'>
        {isError && <Error />}

        <Header burgerRef={burgerRef} />

        <div className='content'>
          <Menu burgerRef={burgerRef} />

          {!isLoad && !isError && <Books burgerRef={burgerRef} />}
        </div>

        <Footer />
      </div>
    </>
  );
}
