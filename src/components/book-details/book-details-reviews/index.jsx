import React from 'react';

import { DetailsRating } from '../book-details-rating';
import styles from './book-details-reviews.module.scss';

import { ReviewsList } from '../../book-reviews-list';

import { PrimaryBtn } from '../../btns-components/primary-btn';

export function BookDetailsReviews({ rating }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const btnTitle = 'оценить книгу';
  const btnSize = 'full';

  const handleReviewsClick = () => {
    console.log('reviews click');
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.root}>
      <div className={styles.reviewsSection}>
        <div className={styles.reviewsSectionTitle}>Рейтинг</div>
        <div className={styles.rating}>
          <DetailsRating rating={rating} type='book' />
          <span className={styles.ratingValue}>{rating}</span>
        </div>
      </div>
      <div className={styles.reviewsSection}>
        <div className={styles.reviewsSectionTitle}>Подробная информация</div>
        <div className={styles.specification}>
          <div className={styles.specificationCol}>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Издательство</div>
              <div className={styles.specificationRowValue}>Питер</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Год издания</div>
              <div className={styles.specificationRowValue}>2019</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Страниц</div>
              <div className={styles.specificationRowValue}>288</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Переплёт</div>
              <div className={styles.specificationRowValue}>Мягкая обложка</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Формат</div>
              <div className={styles.specificationRowValue}>70х100</div>
            </div>
          </div>
          <div className={styles.specificationCol}>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Жанр</div>
              <div className={styles.specificationRowValue}>Компьютерная литература</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Вес</div>
              <div className={styles.specificationRowValue}>370 г</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>ISBN</div>
              <div className={styles.specificationRowValue}>978-5-4461-0923-4</div>
            </div>
            <div className={styles.specificationRow}>
              <div className={styles.specificationRowTitle}>Изготовитель</div>
              <div className={styles.specificationRowValue}>
                ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29
              </div>
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
          Отзывы <span className={isOpen ? styles.reviewsCountActive : styles.reviewsCount}>2</span>
        </div>
        {isOpen && <ReviewsList reviewsCount={3} />}

        <div className={styles.reviewsBtn}>
          <PrimaryBtn size={btnSize} title={btnTitle} />
        </div>
      </div>
    </div>
  );
}
