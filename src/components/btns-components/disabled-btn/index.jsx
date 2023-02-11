import React from 'react';

import styles from './disabled-btn.module.scss'

export function DisabledBtn({ month, day }) {
  return (
    <button type='button' className={styles.root}>
      занята до {day}.{month}
    </button>
  );
}
