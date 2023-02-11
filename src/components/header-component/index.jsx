import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { setMenuActive, showMenu } from '../../redux/slices/menu-slice';

import styles from './header-component.module.scss';

import logo from '../../assets/images/brand.svg';
import avatar from '../../assets/images/avatar.jpg';

export function Header({ burgerRef }) {
  const { burgerActive } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  function toggleBurger() {
    dispatch(setMenuActive());
  }

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
            <img src={logo} alt='' />
          </div>
        </Link>
        <div className='title h3'>Библиотека</div>
      </div>
      <div className='headerRightSide'>
        <div className={styles.profile}>
          <div className={styles.profileDesc}>Привет, Иван!</div>
          <div className={styles.profileImageWrapper}>
            <img src={avatar} alt='avatar' />
          </div>
        </div>
      </div>
    </header>
  );
}
