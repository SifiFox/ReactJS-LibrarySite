import React from 'react';
import { useCalendar } from '../../hooks/use-calendar';
import { checkIsToday } from '../../utils/helpers/check-is-today';
import { formatDate } from '../../utils/helpers/format-date';

import styles from './datepicker.module.scss';

export function DatePicker({ locale = 'default', selectedDate: date, selectDate, firstWeekDayNumber = 2 }) {
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });

  function dateController(day) {
    // console.log(day);

    if (checkIsToday(day.date)) {
      return (
        <div key={day.timestamp} className={styles.today}>
          {day.dayNumber}
        </div>
      );
    }
    if (day.dayNumberInWeek === 7 || day.dayNumberInWeek === 1) {
      return (
        <div key={day.timestamp} className={styles.weekend}>
          {day.dayNumber}
        </div>
      );
    }

    return (
      <div key={day.timestamp} className={styles.day}>
        {day.dayNumber}
      </div>
    );
  }

  console.log(state);
  return (
    <div className={styles.root}>
      <div className={styles.calendarHeader}>
        <div className={styles.yearSelect}>
          {state.mode === 'days' && (
            <span className={styles.yearTitle}>
              {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
            </span>
          )}
        </div>
        <div className={styles.calendarNav}>
          <div className={styles.arrowTop}>top</div>
          <div className={styles.arrowDown}>down</div>
        </div>
      </div>
      <div className={styles.calendarBody}>
        <div className={styles.dayNames}>
          {state.weekDaysNames.map((weekDaysName) => (
            <div key={weekDaysName.dayShort} className={styles.dayName}>
              {weekDaysName.dayShort}
            </div>
          ))}
        </div>
        <div className={styles.days}>
          {state.calendarDays.map((day) =>
            // <div
            //   key={state.timestamp}
            //   className={day.dayNumberInWeek === 7 || day.dayNumberInWeek === 1 ? styles.weekend : styles.day}
            // >
            //   {dateController(day)}
            // </div>

            dateController(day)
          )}
        </div>
      </div>
    </div>
  );
}
