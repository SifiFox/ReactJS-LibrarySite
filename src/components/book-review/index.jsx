import { DetailsRating } from '../book-details/book-details-rating';
import styles from './book-review.module.scss';

export function BookReview({ image, author, rating, date, description }) {
  return (
    <div className={styles.root}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewAuthorAvatar}>
          <img src={image} alt='' />
        </div>
        <div className={styles.reviewAuthorName}>{author}</div>
        <div className={styles.reviewDate}>{date}</div>
      </div>
      <div className={styles.reviewRating}>
        <DetailsRating rating={rating} type='review' />
      </div>
      {description ? <div className={styles.reviewDescription}>{description}</div> : ''}
    </div>
  );
}
