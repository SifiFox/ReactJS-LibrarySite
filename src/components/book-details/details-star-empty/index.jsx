import styles from './details-star-empty.module.scss';

import star from '../../../assets/icons/starEmpty.svg';

export function DetailsStarEmpty({ type }) {
  return (
    <div className={type === 'book' ? styles.detailsStarEmpty : styles.detailsStarReviewEmpty}>
      <img src={star} alt='star empty' />
    </div>
  );
}
