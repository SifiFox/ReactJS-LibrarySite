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

  const [localError, setLocalError] = React.useState(null);

  const dispatch = useDispatch();
  const [userLogin, data, isLoading, error] = useUserLoginMutation();
  const user = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (data.isLoading) {
      dispatch(showLoader());
    }

    if (!data.isLoading) {
      dispatch(hideLoader());

      if (data.error) {
        if (data.error.status === 400) {
          setLocalError(data.error.status);
        } else {
          handleAuthError(data.error.status);
        }
      } else {
        console.log(data);
      }
    }
  }, [isLoading, data, userLogin, handleAuthError, error, dispatch]);

  const handleLogin = async (user) => {
    const userData = await userLogin(user);
    if (userData.error) {
      console.log(userData);
    } else {
      dispatch(setToken(userData));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (user) => handleLogin(user);

  return (
    <>
      <div className={styles.authTitle}>
        <span>Вход в личный кабинет</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            placeholder='Логин'
            className={errors.identifier || localError === 400 ? styles.inputTextError : styles.inputText}
            {...register('identifier', {
              required: 'Поле не может быть пустым',
              minLength: {
                value: 2,
                message: 'Min length is 2',
              },
            })}
          />
          <label className={styles.inputLabel} htmlFor='identifier'>
            Логин
          </label>

          {errors.identifier && <p className={styles.errorMessage}>{errors.identifier.message}</p>}
        </div>
        <div className={styles.inputWrapper}>
          <input
            type={isShowed ? 'text' : 'password'}
            placeholder='Пароль'
            className={errors.password || localError === 400 ? styles.inputTextError : styles.inputText}
            {...register('password', {
              required: 'Поле не может быть пустым',
              minLength: {
                value: 2,
                message: 'Min length is 2',
              },
            })}
          />
          <label className={styles.inputLabel} htmlFor='password'>
            Пароль
          </label>

          <div role='presentation' onClick={() => setIsShowed(!isShowed)} className={styles.passShow}>
            <img src={isShowed ? passShow : passHide} alt='password showing' />
          </div>

          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        </div>

        {localError === 400 && (
          <>
            <span className={styles.hint}>Неверный логин или пароль</span>
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
