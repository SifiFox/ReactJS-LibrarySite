import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { hideMenu, setMenuActive } from '../../redux/slices/menu-slice';

import styles from './header-component.module.scss';

import logo from '../../assets/images/brand.svg';
import avatar from '../../assets/images/avatar.jpg';
import { logOut } from '../../redux/slices/auth-slice';

export function Header({ burgerRef }) {
  const [profileModalActive, setProfileModalActive] = React.useState(false);
  const { burgerActive } = useSelector((state) => state.menu);
  const { user } = useSelector((state) => state.auth);
  // const currentUser = JSON.parse(user);
  const currentUser = user;

  // React.useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function toggleBurger() {
    dispatch(setMenuActive());
  }

  const handleClickLogout = () => {
    dispatch(logOut());
    dispatch(hideMenu());
    navigate('/auth');
  };

  return (
    <header className={styles.root}>
      <div className={styles.headerLeftSide}>
        <button
          type='button'
          data-test-id='button-burger'
          ref={burgerRef}
          onClick={toggleBurger}
          className={styles.headerBurgerWrapper}
        >
          <div className={burgerActive ? styles.headerBurgerActive : styles.headerBurger}> </div>
        </button>
        <Link to='/books/all'>
          <div className={styles.logo}>
            <img src={logo} alt='logo' />
          </div>
        </Link>
        <div className='title h3'>Библиотека</div>
      </div>
      <div className='headerRightSide'>
        <div role='presentation' onClick={() => setProfileModalActive(!profileModalActive)} className={styles.profile}>
          <div className={styles.profileDesc}>Привет, {currentUser.firstName}!</div>

          <div className={styles.profileImageWrapper}>
            <img src={avatar} alt='avatar' />
          </div>

          <div className={profileModalActive ? styles.profileModal : styles.hide}>
            <span>Профиль</span>
            <span role='presentation' onClick={handleClickLogout}>
              Выход
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
