import React from 'react';

import styles from './book-btn.module.scss';

export function BookBtn({ handleClickBtn, disabled, isBookedMyself }) {
  return isBookedMyself ? (
    <button
      onClick={(e) => handleClickBtn(e)}
      disabled={disabled && disabled}
      className={styles.bookedMyself}
      type='button'
    >
      забронирована
    </button>
  ) : (
    <button onClick={(e) => handleClickBtn(e)} disabled={disabled && disabled} className={styles.root} type='button'>
      {disabled ? 'забронирована' : 'забронировать'}
    </button>
  );
}
