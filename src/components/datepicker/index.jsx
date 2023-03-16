import React from 'react';
import { useCalendar } from '../../hooks/use-calendar';
import { checkDateIsEqual } from '../../utils/helpers/check-date-is-equal';
import { checkIsToday } from '../../utils/helpers/check-is-today';
import { checkIsTomorow } from '../../utils/helpers/check-is-tomorow';
import { formatDate } from '../../utils/helpers/format-date';

import calendarArrow from '../../assets/icons/calendarArrow.svg';
import styles from './datepicker.module.scss';

export function DatePicker({ locale = 'default', selectedDate: date, handleSelectDay, firstWeekDayNumber = 2 }) {
  const [defaultState, setDefaultState] = React.useState(true);
  const [monthPickerShowed, setMonthPickerShowed] = React.useState(false);
  const { state, functions } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });

  const handleDayClick = (day) => {
    handleSelectDay(day);
    functions.setSelectedDay(day);
    setDefaultState(false);
  };

  function dateController(day) {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    if (checkDateIsEqual(day.date, state.selectedDay.date)) {
      if (defaultState) {
        if (checkIsToday(day.date)) {
          return (
            <div role='presentation' onClick={() => handleDayClick(day)} key={day.timestamp} className={styles.today}>
              {day.dayNumber}
            </div>
          );
        }
      }
      return (
        <div role='presentation' onClick={() => handleDayClick(day)} key={day.timestamp} className={styles.selectedDay}>
          {day.dayNumber}
        </div>
      );
    }

    if (checkIsToday(day.date)) {
      return (
        <div role='presentation' onClick={() => handleDayClick(day)} key={day.timestamp} className={styles.today}>
          {day.dayNumber}
        </div>
      );
    }

    if (checkIsTomorow(day.date)) {
      return (
        <div
          role='presentation'
          onClick={() => handleDayClick(day)}
          key={day.timestamp}
          className={styles.selectAccessable}
        >
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
        <div role='presentation' onClick={() => setMonthPickerShowed(true)} className={styles.yearSelect}>
          {state.mode === 'days' && (
            <span className={styles.yearTitle}>
              {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
            </span>
          )}
        </div>
        <div className={styles.calendarNav}>
          <div role='presentation' onClick={() => functions.onClickArrow('left')} className={styles.arrowTop}>
            <img src={calendarArrow} alt='' />
          </div>
          <div role='presentation' onClick={() => functions.onClickArrow('right')} className={styles.arrowDown}>
            <img src={calendarArrow} alt='' />
          </div>
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
        <div className={styles.days}>{state.calendarDays.map((day) => dateController(day))}</div>
      </div>

      {monthPickerShowed && (
        <div className={styles.monthPicker}>
          {state.monthesNames.map((monthName) => (
            <div
              role='presentation'
              onClick={() => {
                functions.setSelectedMonthByIndex(monthName.monthIndex);
                setMonthPickerShowed(false);
              }}
              className={styles.month}
            >
              {monthName.month}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
