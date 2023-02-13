import { useParams } from 'react-router-dom';

import styles from './book-details-info.module.scss';

import imageEmpty from '../../../assets/images/bookImageEmpty.jpg';
import { PrimaryBtn } from '../../btns-components/primary-btn';
import { BookSwiper } from '../../swiper';

// export function BookDetailsInfo({ image, title, author, year }) {
export function BookDetailsInfo({ ...props }) {
  const baseUrl = 'https://strapi.cleverland.by';
  const imageUrl = baseUrl.concat(props.image[0].url);

  const btnTitle = 'Забронировать';
  const btnSize = 'root';
  return (
    <div className={styles.root}>
      <div className={styles.mainImage}>
        {props.image.length > 1 ? (
          <BookSwiper images={imageUrl} />
        ) : (
          <img src={props.image.length === 1 ? imageUrl : imageEmpty} alt='' />
        )}
      </div>
      <div className={styles.mainInfo}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.author}>
          {props.author}, {props.year}
        </div>

        <PrimaryBtn data-test-id='button-rating' size={btnSize} title={btnTitle} />

        <div className={styles.description}>
          <div className={styles.discriptionTitle}>О книге</div>
          <div className={styles.descriptionContent}>
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
