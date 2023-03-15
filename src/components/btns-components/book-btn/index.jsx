import React from 'react';

import styles from './book-btn.module.scss';

export function BookBtn({ handleClickBtn }) {
  return (
    <button onClick={(e) => handleClickBtn(e)} className={styles.root} type='button'>
      забронировать
    </button>
  );
}
