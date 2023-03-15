import React from 'react';
import { useSelector } from 'react-redux';
import { DatePicker } from '../datepicker';

import styles from './modals.module.scss';

export function Modal({ title }) {
  const { type } = useSelector((state) => state.modal);
  const [selectedDate, selectDate] = React.useState(new Date());

  return (
    <div className={styles.root}>
      <div className={styles.modalContent}>
        <div className={styles.modalTitle}>{title}</div>
        {type !== 'rating' && <DatePicker selectDate={selectDate} selectedDate={selectedDate} />}
      </div>
    </div>
  );
}
