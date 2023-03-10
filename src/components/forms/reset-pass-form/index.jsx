import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useResetPasswordMutation } from '../../../redux/slices/api-slice';
import styles from './reset-form.module.scss';
import { resetPassSchema } from '../../../validations/user-validation';
import passShow from '../../../assets/icons/password-showed.svg';
import passHide from '../../../assets/icons/password-hide.svg';
import { hideLoader, showLoader } from '../../../redux/slices/loader-slice';
import { replacedString } from '../../../hooks/replace-string';
import { passwordStr } from '../../../constants/constants';

export function ResetForm({ resetCode, handleForgetSuccess }) {
  const [resetPassword, data, isLoading, error] = useResetPasswordMutation();
  const [localError, setLocalError] = React.useState(null);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [isShowed, setIsShowed] = React.useState(false);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (data.isLoading) {
      dispatch(showLoader());
    }
    if (!data.isLoading) {
      dispatch(hideLoader());

      if (data.error) {
        if (data.error.status === 400) {
          setLocalError(data.error.status);
        }
      } else {
        console.log(data);
      }
    }
  }, [isLoading, data, error, dispatch]);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(resetPassSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
    criteriaMode: 'all',
  });

  const handleResetPassword = async (resetPassData) => {
    trigger();

    const ans = await resetPassword(resetPassData);
    if (ans.error) {
      console.log(ans);
      handleForgetSuccess(ans.error.originalStatus);
    } else {
      handleForgetSuccess(200);
    }
  };

  const onSubmit = (resetPassData) => handleResetPassword(resetPassData);

  return (
    <>
      <div className={styles.authTitle}>
        <span>Восстановление</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <input
            type={isShowed ? 'text' : 'password'}
            placeholder='Новый пароль'
            className={errors.password || localError === 400 ? styles.inputTextError : styles.inputText}
            {...register('password')}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <label className={styles.inputLabel} htmlFor='password'>
            Новый пароль
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

        <div className={styles.inputWrapper}>
          <input
            type={isShowed ? 'text' : 'password'}
            placeholder='Повторите пароль'
            className={errors.password || localError === 400 ? styles.inputTextError : styles.inputText}
            {...register('confirmPassword')}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
          <label className={styles.inputLabel} htmlFor='confirmPassword'>
            Повторите пароль
          </label>

          <div role='presentation' onClick={() => setIsShowed(!isShowed)} className={styles.passShow}>
            <img src={isShowed ? passShow : passHide} alt='password showing' />
          </div>

          {passwordFocus ? (
            errors.confirmPassword?.types ? (
              replacedString(passwordStr, errors.confirmPassword.types)
            ) : (
              <p className={!errors.confirmPassword ? styles.hint : styles.errorMessage}>{passwordStr}</p>
            )
          ) : (
            <p className={!errors.confirmPassword ? styles.hint : styles.errorMessage}>{passwordStr}</p>
          )}
        </div>

        <button type='submit' disabled={!isValid && 'disabled'} className={styles.inputSubmit}>
          сохранить изменения
        </button>
      </form>
    </>
  );
}
