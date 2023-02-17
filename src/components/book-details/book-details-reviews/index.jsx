import React from 'react';

import { DetailsRating } from '../book-details-rating';
import styles from './book-details-reviews.module.scss';

import { ReviewsList } from '../../book-reviews-list';

import { PrimaryBtn } from '../../btns-components/primary-btn';

export function BookDetailsReviews(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const btnTitle = 'оценить книгу';
  const btnSize = 'full';

  const reviewsCount = props.comments ? props.comments.length : 0;

  const setParam = (value) => (value ? value : '');

  const handleReviewsClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <div className={styles.reviewsSection}>
        <div className={styles.reviewsSectionTitle}>Рейтинг</div>
        <div className={styles.rating}>
          <DetailsRating rating={props.rating} type='book' />
          <span className={styles.ratingValue}>{props.rating}</span>
        </div>
      </div>
      <div className={styles.reviewsSection}>
        <div className={styles.reviewsSectionTitle}>Подробная информация</div>
        <div className={styles.specification}>
          <div className={styles.specificationCol}>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Издательство</div>
              <div className={styles.specificationRowValue}>{setParam(props.publish)}</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Год издания</div>
              <div className={styles.specificationRowValue}>{setParam(props.issueYear)}</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Страниц</div>
              <div className={styles.specificationRowValue}>{setParam(props.pages)}</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Переплёт</div>
              <div className={styles.specificationRowValue}>{setParam(props.cover)}</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Формат</div>
              <div className={styles.specificationRowValue}>{setParam(props.format)}</div>
            </div>
          </div>
          <div className={styles.specificationCol}>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Жанр</div>
              <div className={styles.specificationRowValue}>{setParam(props.categories)}</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Вес</div>
              <div className={styles.specificationRowValue}>{setParam(props.weight)}</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>ISBN</div>
              <div className={styles.specificationRowValue}>{setParam(props.isbn)}</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Изготовитель</div>
              <div className={styles.specificationRowValue}>{setParam(props.producer)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.reviewsSection}>
        <div
          role='presentation'
          data-test-id='button-hide-reviews'
          onClick={handleReviewsClick}
          className={styles.reviewsSectionTitle}
        >
          Отзывы <span className={isOpen ? styles.reviewsCountActive : styles.reviewsCount}>{reviewsCount}</span>
        </div>
        {isOpen && reviewsCount > 0 ? <ReviewsList data={props.comments} reviewsCount={reviewsCount} /> : null}

        <div className={styles.reviewsBtn}>
          <PrimaryBtn size={btnSize} title={btnTitle} />
        </div>
      </div>
    </div>
  );
}
