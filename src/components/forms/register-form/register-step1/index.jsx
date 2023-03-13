import React from 'react';

import passShow from '../../../../assets/icons/password-showed.svg';
import passHide from '../../../../assets/icons/password-hide.svg';

import check from '../../../../assets/icons/checkArrow.svg';

import { loginStr, passwordStr } from '../../../../constants/constants';
import { replacedString } from '../../../../hooks/replace-string';

export function RegisterStep1({ styles, errors, register, getValues, clearErrors, setError }) {
  const [isShowed, setIsShowed] = React.useState(false);
  const [localError, setLocalError] = React.useState(null);
  const [loginError, setLoginError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          name='username'
          placeholder='Придумайте логин для входа'
          className={errors.username || localError === 400 ? styles.inputTextError : styles.inputText}
          onFocus={() => {
            setLoginError(false);
          }}
          {...register('username', {
            required: 'Поле не может быть пустым',
            onBlur: () => {
              if (errors.username) {
                setLoginError({
                  status: true,
                  class: 'light',
                });
              }
            },
            onChange: () => {
              if (!getValues('username')) {
                setLoginError({
                  status: true,
                  class: 'red',
                });
              }
            },
          })}
        />
        <label className={styles.inputLabel} htmlFor='username'>
          Придумайте логин для входа
        </label>
        {loginError ? (
          <p data-test-id='hint' className={loginError.class === 'light' ? 'all_string_error' : 'all_error_light'}>
            Используйте для логина латинский алфавит и цифры
          </p>
        ) : errors.username?.types ? (
          replacedString(loginStr, errors.username.types)
        ) : (
          errors.username
        )}
        {!errors.username?.types && !loginError && (
          <p
            className={!errors.username ? styles.hint : styles.errorMessage}
            dangerouslySetInnerHTML={{ __html: `<span class="hint">${loginStr}</span>` }}
          />
        )}
      </div>

      <div className={styles.inputWrapper}>
        <input
          type={isShowed ? 'text' : 'password'}
          placeholder='Пароль'
          className={errors.password || localError === 400 ? styles.inputTextError : styles.inputText}
          {...register('password', {
            required: 'Поле не может быть пустым',
            onBlur: () => {
              if (errors.password) {
                console.log('error');
                setPasswordError({
                  status: true,
                  class: 'light',
                });
              }
            },
            onChange: () => {
              console.log(getValues('password'));
              setPasswordError(false);
              if (!getValues('password')) {
                setPasswordError({
                  status: true,
                  class: 'red',
                });
              }
            },
          })}
        />
        <label className={styles.inputLabel} htmlFor='password'>
          Пароль
        </label>

        <div role='presentation' onClick={() => setIsShowed(!isShowed)} className={styles.passShow}>
          {!errors.password && getValues('password') && (
            <img data-test-id='checkmark' src={check} className={styles.markcheck} alt='markcheck' />
          )}
          <img
            data-test-id={isShowed ? 'eye-opened' : 'eye-closed'}
            src={isShowed ? passShow : passHide}
            alt='password showing'
          />
        </div>

        {passwordError ? (
          <p data-test-id='hint' className={passwordError.class === 'light' ? 'all_string_error' : 'all_error_light'}>
            Пароль не менее 8 символов, с заглавной буквой и цифрой
          </p>
        ) : errors.password?.types ? (
          replacedString(passwordStr, errors.password.types)
        ) : (
          errors.password
        )}
        {!errors.password?.types && !passwordError && (
          <p data-test-id='hint' className='hint_light'>
            Пароль не менее 8 символов, с заглавной буквой и цифрой
          </p>
        )}
      </div>
    </>
  );
}
