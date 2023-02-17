import React from 'react';

import { BookBtn } from '../btns-components/book-btn';
import { DisabledBtn } from '../btns-components/disabled-btn';
import { Rating } from '../rating-components/rating-list';

import styles from './book-component.module.scss';
import bookImageEmpty from '../../assets/images/bookImageEmpty.jpg';
import { baseUrl } from '../../constants/constants';

export function BookCard({ title, rating, year, author, image, booking, listType }) {
  const [isBooked, setIsBooked] = React.useState(false);
  const [dateString, setDateString] = React.useState(null);

  let slicedTitle = title.slice(0, 40);
  if (slicedTitle.length < title.length) {
    slicedTitle += '...';
  }

  React.useEffect(() => {
    if (booking) {
      setIsBooked(true);
      const dateString = new Date(booking.dateOrder).toLocaleString('ru-RU', {
        month: 'numeric',
        day: 'numeric',
      });
      setDateString(dateString);
    }
  }, [booking]);

  return (
    <div data-test-id='card' className={listType === 'square' ? styles.bookSquare : styles.bookLine}>
      <div className={styles.bookImageWrapper}>
        <img
          className={styles.bookImage}
          src={image !== null ? baseUrl.concat(image.url) : bookImageEmpty}
          alt='book'
        />
      </div>

      <div className={styles.bookContent}>
        {rating <= 0 ? (
          <div className={styles.bookRating}>ещё нет оценок</div>
        ) : (
          <Rating rating={rating} listType={listType} />
        )}

        <div className={styles.bookTitle}>{slicedTitle}</div>

        <div className={styles.bookAuthor}>
          {author}, {year}
        </div>
        {isBooked ? <DisabledBtn date={dateString} /> : <BookBtn />}
      </div>
    </div>
  );
}
