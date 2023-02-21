import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useGetCategoriesQuery } from '../../redux/slices/api-slice';

import styles from './menu-component.module.scss';

import { ProfileNav } from '../profile-nav';

import { MenuTabLink } from '../menu-tab-link';
import { setMenuActive } from '../../redux/slices/menu-slice';
import { showError } from '../../redux/slices/loader-slice';
import { setCategoriesList } from '../../redux/slices/categories-slice';

export function Menu({ burgerRef }) {
  const { data = [], isLoading, error } = useGetCategoriesQuery();

  const [isAuth] = React.useState(true);
  const { burgerActive } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const menuRef = React.useRef();
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize, false);

    const handleClickOutside = (e) => {
      if (!e.composedPath().includes(menuRef.current) && !e.composedPath().includes(burgerRef.current)) {
        if (burgerActive) {
          dispatch(setMenuActive());
        }
      }
    };

    if (!isLoading) {
      if (error) {
        dispatch(showError());
      } else {
        dispatch(setCategoriesList(data));
      }
    }

    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, [burgerActive, burgerRef, dispatch, isLoading, error, data]);

  return (
    <div
      role='presentation'
      data-test-id='burger-navigation'
      ref={menuRef}
      className={
        burgerActive ? (windowWidth > 768 ? styles.menuWrapper : styles.menuWrapperActive) : styles.menuWrapper
      }
    >
      <div className={styles.menuTabs}>
        <MenuTabLink
          to='/books/:category'
          menuTab={styles.menuTab}
          menuActiveTab={styles.menuActiveTab}
          menuTabTitle={styles.menuTabTitle}
          menuActiveTabTitle={styles.menuActiveTabTitle}
          menuActiveInnerContent={styles.menuActiveInnerContent}
          menuHideInnerContent={styles.menuHideInnerContent}
          title='Витрина книг'
          innerItems={data}
        />

        <MenuTabLink
          to='/terms'
          menuTab={styles.menuTab}
          menuActiveTab={styles.menuActiveTab}
          menuTabTitle={styles.menuTabTitle}
          menuActiveTabTitle={styles.menuActiveTabTitle}
          menuActiveInnerContent={styles.menuActiveInnerContent}
          menuHideInnerContent={styles.menuHideInnerContent}
          title='Правила пользования'
          innerItems=''
        />

        <MenuTabLink
          to='/contract'
          menuTab={styles.menuTab}
          menuActiveTab={styles.menuActiveTab}
          menuTabTitle={styles.menuTabTitle}
          menuActiveTabTitle={styles.menuActiveTabTitle}
          menuActiveInnerContent={styles.menuActiveInnerContent}
          menuHideInnerContent={styles.menuHideInnerContent}
          title='Договор оферты'
          innerItems=''
        />

        {isAuth && <ProfileNav />}
      </div>
    </div>
  );
}
