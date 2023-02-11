import React from 'react';

import styles from './star-empty.module.scss';

import star from '../../../assets/icons/starEmpty.svg';

export function StarEmpty({ listType }) {
  return (
    <div className={listType === 'square' ? styles.starEmptySquare : styles.starEmptyLine}>
      <img src={star} alt='' />
    </div>
  );
}
