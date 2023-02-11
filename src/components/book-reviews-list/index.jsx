import React from 'react';

import { BookReview } from '../book-review';

import styles from './books-reviews-list.module.scss';

import data from '../../assets/reviews.json';

export function ReviewsList() {
  const [reviews] = React.useState(data);

  return (
    <div className={styles.root}>
      {reviews.map((review) => (
        <BookReview
          key={review.id}
          image={review.image}
          author={review.author}
          rating={review.rating}
          date={review.date}
          description={review.description}
        />
      ))}
    </div>
  );
}
