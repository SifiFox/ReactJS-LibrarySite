import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetBooksQuery } from '../../redux/slices/api-slice';

import { Header } from '../../components/header-component';
import { Menu } from '../../components/menu-component';
import { Books } from '../../components/books-component';
import { Footer } from '../../components/footer-component';
import { Preloader } from '../../components/preload-component';
import { setBooksList } from '../../redux/slices/books-slice';

export function MainPage() {
  const [menuIsActive, setMenuIsActive] = React.useState(false);
  const [burgerIsActive, setBurgerIsActive] = React.useState(false);

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
      dispatch(setBooksList(data));
    }
  }, [location, navigate, isLoading, dispatch, data]);

  return (
    <div className='wrapper'>
      {isLoading && <Preloader />}

      <Header burgerRef={burgerRef} />

      <div className='content'>
        <Menu burgerRef={burgerRef} />

        {!isLoading && <Books burgerRef={burgerRef} />}
      </div>

      <Footer />
    </div>
  );
}
