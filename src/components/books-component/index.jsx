import React from 'react';
import { BooksList } from '../bookslist-component';
import { NavList } from '../navlist-component';

import styles from './books-component.module.scss';

export function Books() {
  const [listType, setListType] = React.useState('square');

  const onClickListType = (val) => {
    setListType(val);
  };

  return (
    <div className={styles.root}>
      <div className={styles.navListWrapper}>
        <NavList listType={listType} onClickListType={onClickListType} />
      </div>
      <div className={listType === 'square' ? styles.booksListWrapperSquare : styles.booksListWrapperLine}>
        <BooksList listType={listType} />
      </div>
    </div>
  );
}
