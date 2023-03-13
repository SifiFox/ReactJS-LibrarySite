import React from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './forgot-pass-form.module.scss';

import { hideLoader, showLoader } from '../../../redux/slices/loader-slice';
import { useForgotPasswordMutation } from '../../../redux/slices/api-slice';

import arrow from '../../../assets/icons/arrow.svg';

export function ForgotForm({ handleForgetSuccess }) {
  const [localError, setLocalError] = React.useState(null);
  const [emailError, setEmailError] = React.useState();
  const dispatch = useDispatch();

  const [forgotPassword, data, isLoading, error] = useForgotPasswordMutation();

  React.useEffect(() => {
    if (data.isLoading) {
      dispatch(showLoader());
    }

    if (!data.isLoading) {
      dispatch(hideLoader());

      if (data.error) {
        setLocalError(data.error.data);
      }
    }
  }, [isLoading, data, error, dispatch]);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'all',
  });

  const handleResetPassword = async (userEmail) => {
    const res = await forgotPassword({ email: userEmail.email });
    if (res.error) {
      setLocalError(res);
      setError('email', {
        message: 'error',
      });
    } else {
      setLocalError(null);
      handleForgetSuccess(true);
    }
  };

  const onSubmit = (email) => handleResetPassword(email);

  return (
    <>
      <div className={styles.authTitle}>
        <span>Восстановление пароля</span>
      </div>

      <form data-test-id='send-email-form' onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            placeholder='Email'
            className={errors.email || localError ? styles.inputTextError : styles.inputText}
            onFocus={() => {
              setEmailError(false);
            }}
            {...register('email', {
              required: 'Поле не может быть пустым',
              minLength: {
                value: 2,
                message: 'Минимальная длина 2 символа',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Введите корректный e-mail',
              },
            })}
          />
          <label className={styles.inputLabel} htmlFor='email'>
            Email
          </label>

          {errors.email && (
            <span data-test-id='hint' className={styles.errorMessage}>
              {errors.email.message}
            </span>
          )}

          <div className={styles.hint}>
            На это email будет отправлено письмо с инструкциями по восстановлению пароля
          </div>
        </div>

        <button type='submit' className={styles.inputSubmit}>
          Восстановить
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
