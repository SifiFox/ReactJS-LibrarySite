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
import { hideLoader } from '../../redux/slices/loader-slice';

export function MainPage() {
  const [menuIsActive, setMenuIsActive] = React.useState(false);
  const [burgerIsActive, setBurgerIsActive] = React.useState(false);

  const isLoad = useSelector((state) => state.loader.isLoad);

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
  }, [location, navigate, isLoading, dispatch, data, isLoad]);

  return (
    <>
      {isLoad && !error && <Preloader />}

      <div className='wrapper'>
        {error && <Error />}

        <Header burgerRef={burgerRef} />

        <div className='content'>
          <Menu burgerRef={burgerRef} />

          {!isLoad && !error && <Books burgerRef={burgerRef} />}
        </div>

        <Footer />
      </div>
    </>
  );
}
