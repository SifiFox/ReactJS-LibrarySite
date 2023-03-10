import React from 'react';

import { InputMask } from 'primereact/inputmask';

import passShow from '../../../../assets/icons/password-showed.svg';
import passHide from '../../../../assets/icons/password-hide.svg';
import { phoneStr, emailStr } from '../../../../constants/constants';
import { replacedString } from '../../../../hooks/replace-string';

export function RegisterStep3({ styles, errors, register, trigger, control, Controller, setValue }) {
  const [phoneFocus, setPhoneFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  // const [phoneState, setPhoneState] = React.useState('');
  const [phone, setPhone] = React.useState('');

  React.useEffect(() => {
    setValue('phone', phone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  const mask = ['+', '3', '7', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  return (
    <>
      <div className={styles.inputWrapper}>
        <InputMask
          mask='+375 (99) 999-99-99'
          slotChar='x'
          name='phone'
          placeholder='Телефон'
          className={styles.inputText}
          {...register('phone')}
          onFocus={() => setPhoneFocus(true)}
          onBlur={() => setPhoneFocus(false)}
        />
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
