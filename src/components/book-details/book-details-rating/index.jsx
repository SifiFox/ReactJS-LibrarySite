import React from 'react';

import styles from './book-details-rating.module.scss';

import { DetailsStarEmpty } from '../details-star-empty';
import { DetailsStarFilled } from '../details-star-filled';

export function DetailsRating({ rating, type }) {
  const starsArr = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starsArr.push(<DetailsStarFilled key={`${i}`} type={type} />);
    } else {
      starsArr.push(<DetailsStarEmpty key={`${i}`} type={type} />);
    }
  }

  return <div className={type === 'book' ? styles.ratingList : styles.ratingListReview}>{starsArr}</div>;
}
