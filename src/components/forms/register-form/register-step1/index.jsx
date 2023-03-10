import React from 'react';

import passShow from '../../../../assets/icons/password-showed.svg';
import passHide from '../../../../assets/icons/password-hide.svg';
import { loginStr, passwordStr } from '../../../../constants/constants';
import { replacedString } from '../../../../hooks/replace-string';

export function RegisterStep1({ styles, errors, register }) {
  const [isShowed, setIsShowed] = React.useState(false);
  const [localError, setLocalError] = React.useState(null);
  const [usernameFocus, setUsernameFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          placeholder='Придумайте логин для входа'
          className={errors.username || localError === 400 ? styles.inputTextError : styles.inputText}
          {...register('username')}
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />
        <label className={styles.inputLabel} htmlFor='username'>
          Придумайте логин для входа
        </label>

        {usernameFocus ? (
          errors.username?.types ? (
            replacedString(loginStr, errors.username.types)
          ) : (
            <p className={!errors.username ? styles.hint : styles.errorMessage}>{loginStr}</p>
          )
        ) : (
          <p className={!errors.username ? styles.hint : styles.errorMessage}>{loginStr}</p>
        )}
      </div>

      <div className={styles.inputWrapper}>
        <input
          type={isShowed ? 'text' : 'password'}
          placeholder='Пароль'
          className={errors.password || localError === 400 ? styles.inputTextError : styles.inputText}
          {...register('password')}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <label className={styles.inputLabel} htmlFor='password'>
          Пароль
        </label>

        <div role='presentation' onClick={() => setIsShowed(!isShowed)} className={styles.passShow}>
          <img src={isShowed ? passShow : passHide} alt='password showing' />
        </div>

        {passwordFocus ? (
          errors.password?.types ? (
            replacedString(passwordStr, errors.password.types)
          ) : (
            <p className={!errors.password ? styles.hint : styles.errorMessage}>{passwordStr}</p>
          )
        ) : (
          <p className={!errors.password ? styles.hint : styles.errorMessage}>{passwordStr}</p>
        )}
      </div>
    </>
  );
}
