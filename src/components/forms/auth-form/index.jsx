import React from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUserLoginMutation } from '../../../redux/slices/api-slice';
import { setToken } from '../../../redux/slices/auth-slice';

import passShow from '../../../assets/icons/password-showed.svg';
import passHide from '../../../assets/icons/password-hide.svg';
import arrow from '../../../assets/icons/arrow.svg';

import styles from './auth-form.module.scss';
import { hideLoader, showLoader } from '../../../redux/slices/loader-slice';

export function AuthForm({ handleAuthError }) {
  const [isShowed, setIsShowed] = React.useState(false);
  const [passswordValue, setPasswordValue] = React.useState('');
  const [localError, setLocalError] = React.useState(null);
  const dispatch = useDispatch();
  const [userLogin, data, isLoading, error] = useUserLoginMutation();
  const user = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    getValues,
    setFocus,
    setError,
    formState: { errors },
  } = useForm({ mode: 'all', reValidateMode: 'all', criteriaMode: 'all' });

  React.useEffect(() => {
    if (data.isLoading) {
      dispatch(showLoader());
    }

    if (!data.isLoading) {
      if (data.error) {
        if (data.error.status === 400) {
          setLocalError(data.error.status);
        } else {
          handleAuthError(data.error.status);
        }
        dispatch(hideLoader());
      } else {
        dispatch(hideLoader());
      }
    }
  }, [isLoading, data, userLogin, handleAuthError, getValues, error, dispatch]);

  const handleLogin = async (user) => {
    const userData = await userLogin(user);
    // if (userData.error) {
    //   console.log(userData);
    // } else {
    //   dispatch(setToken(userData));
    // }
    if (!userData.error) {
      dispatch(setToken(userData));
    }
  };

  const onSubmit = (user) => handleLogin(user);

  return (
    <>
      <div className={styles.authTitle}>
        <span>Вход в личный кабинет</span>
      </div>

      <form data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            placeholder='Логин'
            name='identifier'
            className={errors.identifier || localError === 400 ? styles.inputTextError : styles.inputText}
            {...register('identifier', {
              required: 'Поле не может быть пустым',
            })}
          />
          <label
            role='presentation'
            onClick={() => setFocus('identifier')}
            className={styles.inputLabel}
            htmlFor='identifier'
          >
            Логин
          </label>

          {errors.identifier && (
            <p data-test-id='hint' className={styles.errorMessage}>
              <span className='error_span'>{errors.identifier.message}</span>
            </p>
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
                if (getValues('password')) {
                  setPasswordValue(getValues('password'));
                } else {
                  setError('password', {
                    type: 'all',
                    message: 'Поле не может быть пустым',
                  });
                }
              },
              onChange: () => {
                setPasswordValue(getValues('password'));
              },
            })}
          />
          <label className={styles.inputLabel} htmlFor='password'>
            Пароль
          </label>
          {passswordValue && (
            <div role='presentation' onClick={() => setIsShowed(!isShowed)} className={styles.passShow}>
              <img
                data-test-id={isShowed ? 'eye-opened' : 'eye-closed'}
                src={isShowed ? passShow : passHide}
                alt='password showing'
              />
            </div>
          )}

          {errors.password && (
            <span data-test-id='hint' className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        {localError === 400 && (
          <>
            <span data-test-id='hint' className={styles.errorMessage}>
              Неверный логин или пароль!
            </span>
            <Link className={styles.forgotLink} to='/forgot-pass'>
              Восстановить?
            </Link>
          </>
        )}

        {localError !== 400 && (
          <Link className={styles.forgotLink} to='/forgot-pass'>
            Забыли логин или пароль?
          </Link>
        )}

        <button type='submit' className={styles.inputSubmit}>
          вход
        </button>

        <div className={styles.registerRow}>
          <span>Нет учетной записи?</span>
          <Link className={styles.registerLink} to='/registration'>
            Регистрация
            <img src={arrow} alt='arrow' />
          </Link>
        </div>
      </form>
    </>
  );
}
