import styles from './book-details-info.module.scss';

import imageEmpty from '../../../assets/images/bookImageEmpty.jpg';
import { PrimaryBtn } from '../../btns-components/primary-btn';
import { BookSwiper } from '../../swiper';
import { baseUrl } from '../../../constants/constants';

export function BookDetailsInfo({ ...props }) {
  const imageUrl = baseUrl.concat(props.image[0].url);

  function imagesArray(images) {
    return images.map((image) => baseUrl.concat(image.url));
  }

  const btnTitle = 'Забронировать';
  const btnSize = 'root';
  return (
    <div className={styles.root}>
      <div className={styles.mainImage}>
        {props.image.length > 1 ? (
          <BookSwiper images={imagesArray(props.image)} />
        ) : (
          <img src={props.image.length === 1 ? imageUrl : imageEmpty} alt='book main' />
        )}
      </div>
      <div className={styles.mainInfo}>
        <div data-test-id='book-title' className={styles.title}>
          {props.title}
        </div>
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
