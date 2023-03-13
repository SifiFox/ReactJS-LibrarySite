import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useResetPasswordMutation } from '../../../redux/slices/api-slice';
import styles from './reset-form.module.scss';

import { resetPassSchema } from '../../../validations/user-validation';
import passShow from '../../../assets/icons/password-showed.svg';
import passHide from '../../../assets/icons/password-hide.svg';
import { hideLoader, showLoader } from '../../../redux/slices/loader-slice';
import { replacedString } from '../../../hooks/replace-string';
import { passwordStr } from '../../../constants/constants';

import check from '../../../assets/icons/checkArrow.svg';

export function ResetForm({ resetCode, handleForgetError }) {
  const [resetPassword, data, isLoading, error] = useResetPasswordMutation();
  const [localError, setLocalError] = React.useState(null);
  const [isShowed, setIsShowed] = React.useState(false);
  const [isConfirmShowed, setIsConfirmShowed] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (data.isLoading) {
      dispatch(showLoader());
    }
    if (!data.isLoading) {
      dispatch(hideLoader());

      if (data.error) {
        if (data.error.status === 400 || data.error.status === 405 || data.error.status === 500) {
          setLocalError(data.error.status);
        }
      }
    }
  }, [isLoading, data, error, dispatch]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(resetPassSchema),
    mode: 'all',
    reValidateMode: 'all',
    criteriaMode: 'all',
  });

  const handleResetPassword = async (resetPassData) => {
    resetPassData.code = resetCode;
    const ans = await resetPassword(resetPassData);

    if (ans.error) {
      handleForgetError(405);
    } else {
      handleForgetError(200);
    }
  };

  const onSubmit = (resetPassData) => handleResetPassword(resetPassData);

  return (
    <>
      <div className={styles.authTitle}>
        <span>Восстановление</span>
      </div>
      <form data-test-id='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
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
                if (!getValues('passwordConfirmation')) {
                  setPasswordConfirmError({
                    message: 'Поле не может быть пустым',
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

        <div className={styles.inputWrapper}>
          <input
            type={isConfirmShowed ? 'text' : 'password'}
            placeholder='Повторите пароль'
            onFocus={() => setPasswordConfirmError(false)}
            className={errors.password || localError === 400 ? styles.inputTextError : styles.inputText}
            {...register('passwordConfirmation', {
              required: 'Поле не может быть пустым',
              onBlur: () => {
                if (getValues('password') !== getValues('passwordConfirmation')) {
                  setPasswordConfirmError({ message: 'Пароли не совпадают' });
                }
                if (getValues('password') === getValues('passwordConfirmation')) {
                  setPasswordConfirmError(false);
                }
              },
            })}
          />
          <label className={styles.inputLabel} htmlFor='passwordConfirmation'>
            Повторите пароль
          </label>

          <div role='presentation' onClick={() => setIsConfirmShowed(!isConfirmShowed)} className={styles.passShow}>
            <img src={isConfirmShowed ? passShow : passHide} alt='password showing' />
          </div>

          {errors.passwordConfirmation?.type === 'required' ? (
            <p data-test-id='hint' className={styles.errorMessage}>
              {errors.passwordConfirmation.message}
            </p>
          ) : (
            <p data-test-id='hint' className={styles.errorMessage}>
              {passwordConfirmError.message}
            </p>
          )}
        </div>

        <button
          type='submit'
          disabled={!isValid || (passwordConfirmError && 'disabled')}
          className={styles.inputSubmit}
        >
          сохранить изменения
        </button>
      </form>
    </>
  );
}
