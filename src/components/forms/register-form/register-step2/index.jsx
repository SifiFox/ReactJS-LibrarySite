import React from 'react';

import passShow from '../../../../assets/icons/password-showed.svg';
import passHide from '../../../../assets/icons/password-hide.svg';
import { firstNameStr, lastNameStr } from '../../../../constants/constants';
import { replacedString } from '../../../../hooks/replace-string';

export function RegisterStep2({ styles, errors, register }) {
  const [isShowed, setIsShowed] = React.useState(false);
  const [localError, setLocalError] = React.useState(null);
  const [firstNameFocus, setFirstNameFocus] = React.useState(false);
  const [lastNameFocus, setLastNameFocus] = React.useState(false);

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          placeholder='Имя'
          className={styles.inputText}
          {...register('firstName')}
          onFocus={() => setFirstNameFocus(true)}
          onBlur={() => setFirstNameFocus(false)}
        />
        <label className={styles.inputLabel} htmlFor='firstName'>
          Имя
        </label>

        {firstNameFocus
          ? errors.firstName?.types && replacedString(firstNameStr, errors.firstName.types)
          : errors.firstName?.types && (
              <p className={!errors.firstName ? styles.hint : styles.errorMessage}>{firstNameStr}</p>
            )}
      </div>
      <div className={styles.inputWrapper}>
        <input
          placeholder='Фамилия'
          className={styles.inputText}
          {...register('lastName')}
          onFocus={() => setLastNameFocus(true)}
          onBlur={() => setLastNameFocus(false)}
        />
        <label className={styles.inputLabel} htmlFor='lastName'>
          Фамилия
        </label>

        {lastNameFocus
          ? errors.lastName?.types && replacedString(lastNameStr, errors.lastName.types)
          : errors.lastName?.types && (
              <p className={!errors.lastName ? styles.hint : styles.errorMessage}>{lastNameStr}</p>
            )}
      </div>
    </>
  );
}
