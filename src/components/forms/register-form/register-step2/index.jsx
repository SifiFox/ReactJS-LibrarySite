import React from 'react';

import { firstNameStr, lastNameStr } from '../../../../constants/constants';
import { replacedString } from '../../../../hooks/replace-string';

export function RegisterStep2({ styles, errors, register }) {
  const [firstNameFocus, setFirstNameFocus] = React.useState(false);
  const [lastNameFocus, setLastNameFocus] = React.useState(false);

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          placeholder='Имя'
          className={styles.inputText}
          {...register('firstName', {
            required: 'Поле не может быть пустым',
          })}
        />
        <label className={styles.inputLabel} htmlFor='firstName'>
          Имя
        </label>

        {firstNameFocus
          ? errors.firstName?.types && replacedString(firstNameStr, errors.firstName.types)
          : errors.firstName?.types && (
              <p data-test-id='hint' className={!errors.firstName ? styles.hint : styles.errorMessage}>
                {firstNameStr}
              </p>
            )}
      </div>
      <div className={styles.inputWrapper}>
        <input
          placeholder='Фамилия'
          className={styles.inputText}
          {...register('lastName', {
            required: 'Поле не может быть пустым',
          })}
        />
        <label className={styles.inputLabel} htmlFor='lastName'>
          Фамилия
        </label>

        {lastNameFocus
          ? errors.lastName?.types && replacedString(lastNameStr, errors.lastName.types)
          : errors.lastName?.types && (
              <p data-test-id='hint' className={!errors.lastName ? styles.hint : styles.errorMessage}>
                {lastNameStr}
              </p>
            )}
      </div>
    </>
  );
}
