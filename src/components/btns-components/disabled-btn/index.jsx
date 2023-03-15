import React from 'react';

import styles from './disabled-btn.module.scss';

export function DisabledBtn({ date }) {
  return (
    <button type='button' disabled={true} className={styles.root}>
      занята до {date}
    </button>
  );
}
