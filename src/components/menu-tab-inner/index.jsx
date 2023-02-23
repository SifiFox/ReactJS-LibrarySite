import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { setMenuActive } from '../../redux/slices/menu-slice';

import styles from './menu-tab-inner.module.scss';

export function MenuTabInner({ data, showed }) {
  const setActive = ({ isActive }) => (isActive ? styles.menuTabRowTitleActive : styles.menuTabRowTitle);
  const booksList = useSelector((state) => state.booksList.booksList);
  const categoriesList = useSelector((state) => state.categoriesList.categoriesList);

  const location = useLocation();
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);

  const handleClickMenuItem = () => {
    if (windowWidth <= 768) {
      dispatch(setMenuActive());
    }
  };

  const getCountByCategory = (category) => {
    const filtredByCategory = booksList.filter((book) => book.categories.includes(category.name));
    return filtredByCategory.length;
  };

  return (
    <div className={showed ? styles.menuTabInner : styles.hide}>
      <ul>
        <li className={styles.menuTabRow}>
          <NavLink onClick={handleClickMenuItem} to='/books/all' className={setActive}>
            <span
              data-test-id={windowWidth > 768 ? `navigation-books` : windowWidth <= 768 && `burger-books`}
              className={styles.categoryName}
            >
              Все книги
            </span>
          </NavLink>
        </li>

        {data &&
          data.map((category) => (
            <li key={category.id} className={styles.menuTabRow}>
              <NavLink onClick={handleClickMenuItem} to={`/books/${category.path}`} className={setActive}>
                <span
                  data-test-id={
                    windowWidth > 768 ? `navigation-${category.path}` : windowWidth <= 768 && `burger-${category.path}`
                  }
                  className={styles.categoryName}
                >
                  {category.name}
                </span>
                <span
                  data-test-id={
                    windowWidth > 768
                      ? `navigation-book-count-for-${category.path}`
                      : windowWidth <= 768 && `burger-book-count-for-${category.path}`
                  }
                  className={styles.menuTabRowCount}
                >
                  {getCountByCategory(category)}
                </span>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
}
