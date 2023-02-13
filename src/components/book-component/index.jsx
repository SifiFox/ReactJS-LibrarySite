import { BookBtn } from '../btns-components/book-btn';
import { DisabledBtn } from '../btns-components/disabled-btn';
import { Rating } from '../rating-components/rating-list';

import styles from './book-component.module.scss';
import bookImageEmpty from '../../assets/images/bookImageEmpty.jpg';

export function BookCard({ title, rating, year, author, image, listType }) {
  // const date = new Date(bookedTill);
  // const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  // const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

  let slicedTitle = title.slice(0, 40);

  if (slicedTitle.length < title.length) {
    slicedTitle += '...';
  }

  const ibooked = false;
  const baseUrl = 'https://strapi.cleverland.by';

  return (
    <div data-test-id='card' className={listType === 'square' ? styles.bookSquare : styles.bookLine}>
      <div className={styles.bookImageWrapper}>
        <img
          className={styles.bookImage}
          // src={Number(image.length) !== 0 ? (Number(image.length) > 1 ? image[0] : image) : bookImageEmpty}
          src={image !== null ? baseUrl.concat(image.url) : bookImageEmpty}
          alt=''
        />
      </div>

      <div className={styles.bookContent}>
        {rating <= 0 ? (
          <div className={styles.bookRating}>ещё нет оценок</div>
        ) : (
          <Rating rating={3} listType={listType} />
        )}

        <div className={styles.bookTitle}>{slicedTitle}</div>

        <div className={styles.bookAuthor}>
          {author}, {year}
        </div>
        {/* {isBooked ? <DisabledBtn month={12} day={12} /> : <BookBtn />} */}
        {ibooked ? <DisabledBtn month={12} day={12} /> : <BookBtn />}
      </div>
    </div>
  );
}
