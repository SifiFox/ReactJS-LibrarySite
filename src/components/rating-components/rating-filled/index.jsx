import React from 'react';

import styles from './rating-filled.module.scss';

import star from '../../../assets/icons/starFilled.svg';

export function StarFilled({ listType }) {
  return (
    <div className={listType === 'square' ? styles.starFilledSquare : styles.starFilledLine}>
      <img src={star} alt='' />
    </div>
  );
}
