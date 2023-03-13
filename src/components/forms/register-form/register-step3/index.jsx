import React from 'react';

import { InputMask } from 'primereact/inputmask';

import passShow from '../../../../assets/icons/password-showed.svg';
import passHide from '../../../../assets/icons/password-hide.svg';
import { phoneStr, emailStr } from '../../../../constants/constants';
import { replacedString } from '../../../../hooks/replace-string';

export function RegisterStep3({ styles, errors, register, trigger, control, Controller, setValue, getValues }) {
  const [phoneFocus, setPhoneFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState();
  const [phone, setPhone] = React.useState('');

  const mask = ['+', '3', '7', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  return (
    <>
      <div className={styles.inputWrapper}>
        <InputMask
          autoClear={false}
          mask='+375 (99) 999-99-99'
          slotChar='x'
          name='phone'
          placeholder='Телефон'
          value={phone && phone}
          className={styles.inputText}
          onFocus={() => {
            setPhoneError(false);
            setPhoneFocus(true);
          }}
          {...register('phone', {
            required: 'Поле не может быть пустым',
            onBlur: () => {
              setPhone(getValues('phone'));
              setPhoneFocus(false);
            },
            onChange: () => {
              if (errors.phone) {
                setPhoneError(true);
              }
              setPhone(getValues('phone'));
            },
          })}
        />
        <label className={styles.inputLabel} htmlFor='phone'>
          Телефон
        </label>

        {errors.phone ? (
          errors.phone?.type === 'required' ? (
            <p data-test-id='hint' className={!errors.phone ? styles.hint : styles.errorMessage}>
              Поле не может быть пустым
            </p>
          ) : (
            <p data-test-id='hint' className={styles.errorMessage}>
              {phoneStr}
            </p>
          )
        ) : phoneFocus ? (
          <p data-test-id='hint' className='hint_light'>
            {phoneStr}
          </p>
        ) : (
          <p data-test-id='hint' className='hint'>
            {phoneStr}
          </p>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <input
          placeholder='E-mail'
          className={styles.inputText}
          onFocus={() => setEmailFocus(true)}
          {...register('email', {
            required: 'Поле не может быть пустым',
            onBlur: () => {
              setEmailFocus(false);
            },
          })}
        />
        <label className={styles.inputLabel} htmlFor='email'>
          E-mail
        </label>

        {errors.email && errors.email?.type === 'required' ? (
          <p data-test-id='hint' className={!errors.email ? styles.hint : styles.errorMessage}>
            Поле не может быть пустым
          </p>
        ) : (
          <p data-test-id='hint' className={styles.errorMessage}>
            {emailStr}
          </p>
        )}

        {/* {emailFocus
          ? errors.email?.types && replacedString(emailStr, errors.email.types)
          : errors.email?.types && <p className={!errors.email ? styles.hint : styles.errorMessage}>{emailStr}</p>} */}
      </div>
    </>
  );
}
