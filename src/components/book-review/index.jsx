import { DetailsRating } from '../book-details/book-details-rating';
import styles from './book-review.module.scss';

import imageEmpty from '../../assets/images/reviewAvatar.jpg';

export function BookReview({ id, rating, text, time, user }) {
  const userImage = user.avatarUrl ? user.avatarUrl : imageEmpty;

  const date = new Date(time);

  return (
    <div className={styles.root}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewAuthorAvatar}>
          <img src={userImage} alt='' />
        </div>
        <div className={styles.reviewAuthorName}>
          {user.firstName} {user.lastName}
        </div>
        <div className={styles.reviewDate}>{date.toLocaleDateString()}</div>
      </div>
      <div className={styles.reviewRating}>
        <DetailsRating rating={rating} type='review' />
      </div>
      {text ? <div className={styles.reviewDescription}>{text}</div> : ''}
    </div>
  );
}
