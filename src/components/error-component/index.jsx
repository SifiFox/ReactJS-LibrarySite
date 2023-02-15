import React from 'react';
import styles from './error.module.scss';

import errorCircle from '../../assets/icons/warningCircle.svg';

export function Error() {
  return (
    <div data-test-id='error' className={styles.root}>
      <div className={styles.errorContent}>
        <img src={errorCircle} alt='' />
        <span>Что-то пошло не так. Обновите страницу через некоторое время.</span>
        <button type='button' className={styles.closeError}>
          {' '}
        </button>
      </div>
    </div>
  );
}
