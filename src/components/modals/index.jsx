import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../redux/slices/modal-slice';
import { PrimaryBtn } from '../btns-components/primary-btn';
import { DatePicker } from '../datepicker';

import styles from './modals.module.scss';

export function Modal({ title }) {
  const { type } = useSelector((state) => state.modal);
  const [selectedDate, selectDate] = React.useState(new Date());
  const [isSelect, setIsSelect] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const dispatch = useDispatch();
  const handleSelectDay = (day) => {
    selectDate(day);
    setIsDisabled(false);
  };

  const handleClickClose = () => {
    dispatch(hideModal());
  };

  const handleClickBtn = () => {
    console.log('clicked');
  };

  return (
    <div className={styles.root}>
      <div className={styles.modalContent}>
        <div role='presentation' onClick={handleClickClose} className={styles.modalClose}>
          {' '}
        </div>
        <div className={styles.modalTitle}>{title}</div>
        {type !== 'rating' && <DatePicker selectDate={selectDate} handleSelectDay={handleSelectDay} />}
        <PrimaryBtn handleClickBtn={handleClickBtn} isDisabled={isDisabled} title='Забронировать' />
      </div>
    </div>
  );
}
