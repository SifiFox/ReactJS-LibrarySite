import React from 'react';

import styles from './search-empty.module.scss';

export function SearchEmpty({ innerText, testId }) {
  return (
    <div data-test-id={testId} className={styles.root}>
      {innerText}
    </div>
  );
}
