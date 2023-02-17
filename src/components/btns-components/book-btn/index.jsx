import React from 'react';

import styles from './book-btn.module.scss';

export function BookBtn() {
  return (
    <button className={styles.root} type='button'>
      забронировать
    </button>
  );
}
