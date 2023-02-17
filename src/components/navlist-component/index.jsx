import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import styles from './navlist-component.module.scss';

import iconSearch from '../../assets/icons/iconSearch.svg';
import iconSort from '../../assets/icons/iconSort.svg';
import { showSearch, hideSearch } from '../../redux/slices/search-slice';

export function NavList({ listType, onClickListType }) {
  const [windowWidth, setWindowWidth] = React.useState(React.useRef(window.innerWidth));
  const setActiveBtn = (type) => {
    onClickListType(type);
  };
  const { searchActive } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  function onClickSearch(e) {
    e.stopPropagation();
    if (windowWidth.current < 768) {
      dispatch(showSearch());
    }
  }
  function onClickClose(e) {
    e.stopPropagation();
    dispatch(hideSearch());
  }
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.navListWrapper}>
        <div className={searchActive ? styles.navListActive : styles.navListLeft}>
          <div
            role='presentation'
            data-test-id='button-search-open'
            onClick={onClickSearch}
            className={searchActive ? styles.navListSearchActive : styles.navListSearch}
          >
            <div className={searchActive ? styles.navListActiveSearchIcon : styles.navListSearchIcon}>
              <img src={iconSearch} alt='sort' />
            </div>
            <div className={searchActive ? styles.searchInputWrapperActive : styles.navListSearchInputWrapper}>
              <label htmlFor='searchId'>
                <input
                  type='text'
                  name='searchId'
                  id='searchId'
                  placeholder='Поиск книги или автора…'
                  className={styles.navListSearchInput}
                  data-test-id='input-search'
                />
                <button
                  type='button'
                  data-test-id='button-search-close'
                  onClick={onClickClose}
                  className={styles.closeSearch}
                >
                  {' '}
                </button>
              </label>
            </div>
          </div>
          <div className={searchActive && window.innerWidth < '768' ? styles.blockHidden : styles.navListSort}>
            <div className={styles.navListSortIcon}>
              <img src={iconSort} alt='sort' />
            </div>
            <div className={styles.navListSearchTitle}>По рейтингу</div>
          </div>
        </div>
        <div className={searchActive && window.innerWidth < '768' ? styles.blockHidden : styles.navListRight}>
          <div className={styles.navListGrid}>
            <button
              data-test-id='button-menu-view-window'
              type='button'
              onClick={() => setActiveBtn('square')}
              className={listType === 'square' ? styles.navListActiveType : styles.navListType}
            >
              <svg
                viewBox='0 0 16 16'
                className={styles.navListTypeIconSquare}
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1.52273 0.875C1.165 0.875 0.875 1.165 0.875 1.52273V6.70455C0.875 7.06228 1.165 7.35227 1.52273 7.35227H6.70455C7.06228 7.35227 7.35227 7.06228 7.35227 6.70455V1.52273C7.35227 1.165 7.06228 0.875 6.70455 0.875H1.52273ZM2.17045 6.05682V2.17045H6.05682V6.05682H2.17045ZM9.29545 0.875C8.93772 0.875 8.64773 1.165 8.64773 1.52273V6.70455C8.64773 7.06228 8.93772 7.35227 9.29545 7.35227H14.4773C14.835 7.35227 15.125 7.06228 15.125 6.70455V1.52273C15.125 1.165 14.835 0.875 14.4773 0.875H9.29545ZM9.94318 6.05682V2.17045H13.8295V6.05682H9.94318ZM0.875 9.29545C0.875 8.93772 1.165 8.64773 1.52273 8.64773H6.70455C7.06228 8.64773 7.35227 8.93772 7.35227 9.29545V14.4773C7.35227 14.835 7.06228 15.125 6.70455 15.125H1.52273C1.165 15.125 0.875 14.835 0.875 14.4773V9.29545ZM2.17045 9.94318V13.8295H6.05682V9.94318H2.17045ZM9.29545 8.64773C8.93772 8.64773 8.64773 8.93772 8.64773 9.29545V14.4773C8.64773 14.835 8.93772 15.125 9.29545 15.125H14.4773C14.835 15.125 15.125 14.835 15.125 14.4773V9.29545C15.125 8.93772 14.835 8.64773 14.4773 8.64773H9.29545ZM9.94318 13.8295V9.94318H13.8295V13.8295H9.94318Z'
                  fill='white'
                />
              </svg>
            </button>
            <button
              data-test-id='button-menu-view-list'
              type='button'
              onClick={() => setActiveBtn('line')}
              className={listType !== 'square' ? styles.navListActiveType : styles.navListType}
            >
              <svg
                className={styles.navListTypeIconLine}
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2.0835 10C2.0835 9.56282 2.43794 9.20837 2.87516 9.20837H17.1252C17.5624 9.20837 17.9168 9.56282 17.9168 10C17.9168 10.4373 17.5624 10.7917 17.1252 10.7917H2.87516C2.43794 10.7917 2.0835 10.4373 2.0835 10Z'
                  fill='#A7A7A7'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2.0835 5.25004C2.0835 4.81282 2.43794 4.45837 2.87516 4.45837H17.1252C17.5624 4.45837 17.9168 4.81282 17.9168 5.25004C17.9168 5.68727 17.5624 6.04171 17.1252 6.04171H2.87516C2.43794 6.04171 2.0835 5.68727 2.0835 5.25004Z'
                  fill='#A7A7A7'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M2.0835 14.75C2.0835 14.3128 2.43794 13.9584 2.87516 13.9584H17.1252C17.5624 13.9584 17.9168 14.3128 17.9168 14.75C17.9168 15.1873 17.5624 15.5417 17.1252 15.5417H2.87516C2.43794 15.5417 2.0835 15.1873 2.0835 14.75Z'
                  fill='#A7A7A7'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
