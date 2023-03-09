import React from 'react';

import MaskedInput from 'react-text-mask';
import passShow from '../../../../assets/icons/password-showed.svg';
import passHide from '../../../../assets/icons/password-hide.svg';
import { phoneStr, emailStr } from '../../../../constants/constants';
import { replacedString } from '../../../../hooks/replace-string';

export function RegisterStep3({ styles, errors, register }) {
  const [phoneFocus, setPhoneFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [phoneState, setPhoneState] = React.useState('');

  console.log(errors);
  const handleChangePhone = (e) => {
    setPhoneState(e.target.value);
  };
  return (
    <>
      <div className={styles.inputWrapper}>
        {/* <MaskedInput
          mask={[
            '+',
            '3',
            '7',
            '5',
            ' ',
            '(',
            /\d/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
          ]}
          className={styles.inputText}
          placeholder='Телефон'
          guide={true}
          id='my-input-id'
          {...register('phone')}
          value={phoneState}
          onChange={(e) => handleChangePhone(e)}
          onFocus={() => setPhoneFocus(true)}
          onBlur={() => setPhoneFocus(false)}
        /> */}

        {/* <input
          placeholder='Телефон'
          className={styles.inputText}
          {...register('phone')}
          onFocus={() => setPhoneFocus(true)}
          onBlur={() => setPhoneFocus(false)}
        /> */}
        <label className={styles.inputLabel} htmlFor='phone'>
          Телефон
        </label>

        {phoneFocus
          ? errors.phone?.types && replacedString(phoneStr, errors.phone.types)
          : errors.phone?.types && <p className={!errors.phone ? styles.hint : styles.errorMessage}>{phoneStr}</p>}
      </div>

      <div className={styles.inputWrapper}>
        <input
          placeholder='E-mail'
          className={styles.inputText}
          {...register('email')}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <label className={styles.inputLabel} htmlFor='email'>
          E-mail
        </label>

        {emailFocus
          ? errors.email?.types && replacedString(emailStr, errors.email.types)
          : errors.email?.types && <p className={!errors.email ? styles.hint : styles.errorMessage}>{emailStr}</p>}
      </div>
    </>
  );
}
