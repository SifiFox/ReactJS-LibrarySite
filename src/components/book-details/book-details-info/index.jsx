import { useParams } from 'react-router-dom';

import styles from './book-details-info.module.scss';

import imageEmpty from '../../../assets/images/bookImageEmpty.jpg';
import { PrimaryBtn } from '../../btns-components/primary-btn';
import { BookSwiper } from '../../swiper';

export function BookDetailsInfo({ image, title, author, year }) {
  const btnTitle = 'Забронировать';
  const btnSize = 'root';
  return (
    <div className={styles.root}>
      <div className={styles.mainImage}>
        {image.length > 1 ? (
          <BookSwiper images={image} />
        ) : (
          <img src={image.length === 1 ? image : imageEmpty} alt='' />
        )}
      </div>
      <div className={styles.mainInfo}>
        <div className={styles.title}>{title}</div>
        <div className={styles.author}>
          {author}, {year}
        </div>

        <PrimaryBtn data-test-id='button-rating' size={btnSize} title={btnTitle} />

        <div className={styles.description}>
          <div className={styles.discriptionTitle}>О книге</div>
          <div className={styles.descriptionContent}>
            <p>
              Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
              решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
              изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
              время?
            </p>

            <p>
              Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
              алгоритмы — это веселое и увлекательное занятие.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
