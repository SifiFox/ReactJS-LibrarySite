import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBookingMutation } from '../../redux/slices/api-slice';
import { hideModal } from '../../redux/slices/modal-slice';
import { createDate } from '../../utils/helpers/create-date';
import { PrimaryBtn } from '../btns-components/primary-btn';
import { DatePicker } from '../datepicker';

import styles from './modals.module.scss';

export function Modal({ title }) {
  const { type } = useSelector((state) => state.modal);
  const [isSelect, setIsSelect] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const dispatch = useDispatch();
  const books = useSelector((state) => state.booksList.booksList);
  const selectedBookId = useSelector((state) => state.modal.selectedBook);
  const isBookedMyselfModal = useSelector((state) => state.modal.isBookedMyself);

  const [bookedDate, setBookedDate] = React.useState(() => {
    if (isBookedMyselfModal) {
      return createDate({ date: new Date(books.filter((book) => book.id === selectedBookId)[0].booking.dateOrder) });
    }
    return createDate();
  });

  const [selectedDate, selectDate] = React.useState(() => {
    if (isBookedMyselfModal) {
      return createDate({ date: new Date(books.filter((book) => book.id === selectedBookId)[0].booking.dateOrder) });
    }
    return createDate();
  });
  const [booking, data, isLoading, error] = useBookingMutation();

  const handleSelectDay = (day) => {
    selectDate(day);

    if (isBookedMyselfModal && day.timestamp === bookedDate.timestamp) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const handleClickClose = () => {
    dispatch(hideModal());
  };

  const handleClickBtn = async () => {
    const bookingData = {
      data: {
        order: true,
        dateOrder: selectedDate.date.toISOString(),
        book: selectedBookId,
        customer: JSON.parse(localStorage.getItem('user')).id,
      },
    };

    const ans = await booking(bookingData);
    console.log(ans);
  };

  return (
    <div className={styles.root}>
      <div className={styles.modalContent}>
        <div role='presentation' onClick={handleClickClose} className={styles.modalClose}>
          {' '}
        </div>
        <div className={styles.modalTitle}>{title}</div>
        {type !== 'rating' && (
          <DatePicker selectedDay={selectedDate} selectDate={selectDate} handleSelectDay={handleSelectDay} />
        )}
        <PrimaryBtn handleClickBtn={handleClickBtn} isDisabled={isDisabled} title='Забронировать' />
        {isBookedMyselfModal && <PrimaryBtn handleClickBtn={handleClickBtn} title='Отменить бронь' />}
      </div>
    </div>
  );
}
