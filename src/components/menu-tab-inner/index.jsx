import React from 'react';

import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { setMenuActive } from '../../redux/slices/menu-slice';

import styles from './menu-tab-inner.module.scss';

export function MenuTabInner({ data, showed, defaultActive }) {
  const setActive = ({ isActive }) => (isActive ? styles.menuTabRowTitleActive : styles.menuTabRowTitle);

  const location = useLocation();

  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  React.useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, [location, data]);

  const handleClickMenuItem = () => {
    if (windowWidth <= 768) {
      dispatch(setMenuActive());
    }
  };

  console.log(data);

  return (
    <div className={showed ? styles.menuTabInner : styles.hide}>
      <ul>
        {/* <li className={styles.menuTabRow}>
          <NavLink onClick={handleClickMenuItem} to={`/books/all`} className={setActive}>
            <span className={styles.categoryName}>Все книги</span>
          </NavLink>
        </li> */}

        {data &&
          data.map((category) => (
            <li key={category.id} className={styles.menuTabRow}>
              <NavLink
                data-test-id={
                  category.type === 'all' && windowWidth > 768
                    ? 'navigation-books'
                    : category.type === 'all' && windowWidth <= 768 && 'burger-books'
                }
                onClick={handleClickMenuItem}
                to={`/books/${category.path}`}
                className={setActive}
              >
                <span className={styles.categoryName}>{category.name}</span>
                <span className={styles.menuTabRowCount}>{category.count}</span>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
}
