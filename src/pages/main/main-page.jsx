import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { Header } from '../../components/header-component';
import { Menu } from '../../components/menu-component';
import { Books } from '../../components/books-component';
import { Footer } from '../../components/footer-component';

export function MainPage() {
  const [menuIsActive, setMenuIsActive] = React.useState(false);
  const [burgerIsActive, setBurgerIsActive] = React.useState(false);

  const burgerRef = React.useRef();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate('/books/all');
    }
    if (location.pathname === '/books/:category') {
      navigate('/books/all');
    }
  }, [location, navigate]);

  return (
    <div className='wrapper'>
      <Header burgerRef={burgerRef} />

      <div className='content'>
        <Menu burgerRef={burgerRef} />
        <Books burgerRef={burgerRef} />
      </div>

      <Footer />
    </div>
  );
}
