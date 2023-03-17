import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BookBtn } from '../btns-components/book-btn';
import { DisabledBtn } from '../btns-components/disabled-btn';
import { Rating } from '../rating-components/rating-list';

import styles from './book-component.module.scss';
import bookImageEmpty from '../../assets/images/bookImageEmpty.jpg';
import { baseUrl } from '../../constants/constants';
import { showModal } from '../../redux/slices/modal-slice';

export function BookCard({
  id,
  title,
  rating,
  year,
  author,
  image,
  booking,
  listType,
  markedTitle,
  delivery,
  histories,
}) {
  const [dateString, setDateString] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  const currentUser = user;

  const [isBooked, setIsBooked] = React.useState(false);
  const [isDelivery, setIsDelivery] = React.useState(false);

  const [isBookedMyself, setIsBookedMyself] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (booking) {
      if (booking.customerId === JSON.parse(currentUser).id) {
        setIsBookedMyself(true);
      }
      setIsBooked(true);
    } else {
      setIsBooked(false);
    }
    if (delivery) {
      setIsDelivery(true);
      const dateString = new Date(delivery.dateHandedTo).toLocaleString('ru-RU', {
        month: 'numeric',
        day: 'numeric',
      });
      setDateString(dateString);
    }
  }, [booking, isBooked, delivery, currentUser]);

  const handleClickBtn = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(showModal({ id, isBookedMyself }));
  };

  const renderBtn = () => {
    if (isDelivery) {
      return <DisabledBtn date={dateString} />;
    }
    if (isBookedMyself) {
      return <BookBtn disabled={false} isBookedMyself={isBookedMyself} handleClickBtn={handleClickBtn} />;
    }
    if (isBooked) {
      return <BookBtn disabled={true} handleClickBtn={handleClickBtn} />;
    }
    return <BookBtn handleClickBtn={handleClickBtn} />;
  };

  return (
    <div data-test-id='card' className={listType === 'square' ? styles.bookSquare : styles.bookLine}>
      <div className={styles.bookImageWrapper}>
        <img
          className={styles.bookImage}
          src={image !== null ? baseUrl.concat(image.url) : bookImageEmpty}
          alt='book'
        />
      </div>

      <div className={styles.bookContent}>
        {rating <= 0 ? (
          <div className={styles.bookRating}>ещё нет оценок</div>
        ) : (
          <Rating rating={rating} listType={listType} />
        )}

        <div data-test-id='book-title' className={styles.bookTitle} dangerouslySetInnerHTML={{ __html: markedTitle }} />

        <div className={styles.bookAuthor}>
          {author}, {year}
        </div>
        {renderBtn()}
      </div>
    </div>
  );
}
