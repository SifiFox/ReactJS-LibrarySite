import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './register-form.module.scss';

import passShow from '../../../assets/icons/password-showed.svg';
import passHide from '../../../assets/icons/password-hide.svg';
import arrow from '../../../assets/icons/arrow.svg';

export function RegisterForm() {
  const [step, setStep] = React.useState(1);
  const [localError, setLocalError] = React.useState(null);
  const [isShowed, setIsShowed] = React.useState(false);
  const [buttonAvaliable, setButtonAvaliable] = React.useState(false);

  const loginPattern = /^(?=^.{1,}$)((?=.*\d)(?=.*[a-zA-Z]))[0-9a-zA-Z]*$/;
  const passowrdPattern = /(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}/;

  const handleRegistration = async (userData) => {
    console.log('handleRegister');

    // const userData = await userLogin(user);
    // if (userData.error) {
    //   console.log(userData);
    // } else {
    //   dispatch(setToken(userData));
    // }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (registrationData) => handleRegistration(registrationData);

  const modifyString = (str, type) => {
    switch (type) {
      case 'login':
        console.log('login');
        break;
      case 'password':
        console.log('password');
        break;
      case 'phone':
        console.log('phone');
        break;
    }
  };

  return (
    <>
      <div className={styles.authTitle}>
        <span>Регистрация</span>
      </div>
      <div className={styles.stepTitle}>{step} шаг из 3</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <>
            <div className={styles.inputWrapper}>
              <input
                placeholder='Придумайте логин для входа'
                className={errors.identifier || localError === 400 ? styles.inputTextError : styles.inputText}
                {...register('identifier', {
                  required: 'Поле не может быть пустым',
                  minLength: {
                    value: 2,
                    message: 'Минимальная длина 2 символа',
                  },
                  pattern: {
                    value: loginPattern,
                    message: `Используйте для логина латинский алфавит и цифры`,
                  },
                })}
              />
              <label className={styles.inputLabel} htmlFor='identifier'>
                Придумайте логин для входа
              </label>

              {errors.identifier && <p className={styles.errorMessage}>{errors.identifier.message}</p>}
              {!errors.identifier && (
                <span className={styles.hint}>Используйте для логина латинский алфавит и цифры</span>
              )}
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
                    message: 'Минимальная длина 2 символа',
                  },
                  pattern: {
                    value: passowrdPattern,
                    message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
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
              {!errors.password && (
                <span className={styles.hint}>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className={styles.inputWrapper}>
              <input
                placeholder='Имя'
                className={errors.identifier || localError === 400 ? styles.inputTextError : styles.inputText}
                {...register('name', {
                  required: 'Поле не может быть пустым',
                  minLength: {
                    value: 2,
                    message: 'Min length is 2',
                  },
                })}
              />
              <label className={styles.inputLabel} htmlFor='phoneNum'>
                Имя
              </label>

              {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
            </div>

            <div className={styles.inputWrapper}>
              <input
                placeholder='Фамилия'
                className={errors.surname || localError === 400 ? styles.inputTextError : styles.inputText}
                {...register('surname', {
                  required: 'Поле не может быть пустым',
                  minLength: {
                    value: 2,
                    message: 'Min length is 2',
                  },
                })}
              />
              <label className={styles.inputLabel} htmlFor='surname'>
                Фамилия
              </label>

              {errors.surname && <p className={styles.errorMessage}>{errors.surname.message}</p>}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className={styles.inputWrapper}>
              <input
                placeholder='Номер телефона'
                className={errors.identifier || localError === 400 ? styles.inputTextError : styles.inputText}
                {...register('phoneNum', {
                  required: 'Поле не может быть пустым',
                  minLength: {
                    value: 2,
                    message: 'Min length is 2',
                  },
                })}
              />
              <label className={styles.inputLabel} htmlFor='phoneNum'>
                Номер телефона
              </label>

              {errors.phoneNum && <p className={styles.errorMessage}>{errors.phoneNum.message}</p>}
            </div>

            <div className={styles.inputWrapper}>
              <input
                placeholder='E-mail'
                className={errors.identifier || localError === 400 ? styles.inputTextError : styles.inputText}
                {...register('email', {
                  required: 'Поле не может быть пустым',
                  minLength: {
                    value: 2,
                    message: 'Min length is 2',
                  },
                })}
              />
              <label className={styles.inputLabel} htmlFor='email'>
                E-mail
              </label>

              {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
            </div>
          </>
        )}

        <button type='submit' className={styles.inputSubmit}>
          {step < 2 ? 'Следующий шаг' : 'Последний шаг'}
        </button>

        <div className={styles.registerRow}>
          <span>Есть учетная запись?</span>
          <Link className={styles.registerLink} to='/auth'>
            Войти
            <img src={arrow} alt='arrow' />
          </Link>
        </div>
      </form>
    </>
  );
}
