import styles from './details-star-filled.module.scss';

import star from '../../../assets/icons/starFilled.svg';

export function DetailsStarFilled({ type }) {
  return (
    <div className={type === 'book' ? styles.detailsStarFilled : styles.detailsStarReviewFilled}>
      <img src={star} alt='star filled' />
    </div>
  );
}
