import React from 'react';

import { BookReview } from '../book-review';

import styles from './books-reviews-list.module.scss';

export function ReviewsList({ data }) {
  return (
    <div className={styles.root}>
      {data.map((review) => (
        <BookReview
          key={review.id}
          id={review.id}
          rating={review.rating}
          text={review.text}
          time={review.createdAt}
          user={review.user}
        />
      ))}
    </div>
  );
}
