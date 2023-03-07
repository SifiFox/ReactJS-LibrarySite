import React from 'react';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { expressions } from '../../../constants/constants';

import { userSchemaStage1 } from '../../../validations/user-validation';

import styles from './register-form.module.scss';

import passShow from '../../../assets/icons/password-showed.svg';
import passHide from '../../../assets/icons/password-hide.svg';
import arrow from '../../../assets/icons/arrow.svg';

export function RegisterForm() {
  const [step, setStep] = React.useState(1);
  const [localError, setLocalError] = React.useState(null);
  const [isShowed, setIsShowed] = React.useState(false);
  const [buttonAvaliable, setButtonAvaliable] = React.useState(false);

  const [isBlur, setIsBlur] = React.useState(true);

  const stepBtnTitle = () => {
    if (step === 1) {
      return 'следующий шаг';
    }
    if (step === 2) {
      return 'последний шаг';
    }
    return 'зарегистрироваться';
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(userSchemaStage1),
    mode: 'all',
    reValidateMode: 'onBlur',
    criteriaMode: 'all',
  });

  const handleBlur = (e) => {
    console.log(errors);
    console.log('test');
    setIsBlur(true);
  };

  const submitForm = (registrationData) => {
    console.log(registrationData);
    setStep((prev) => prev + 1);
  };

  const loginRef = React.useRef('login');
  const passRef = React.useRef('password');
  const loginStr = 'Используйте для логина латинский алфавит и цифры';
  const passwordStr = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';

  function modifyStr(str, match) {
    return str.replace(match, `<b>${match}</b>`);
  }
  function replacedString(str, matches) {
    let newStr = str;
    if (typeof matches !== 'string') {
      matches.forEach((match) => {
        newStr = modifyStr(newStr, match);
      });
      return <span className={styles.hint} dangerouslySetInnerHTML={{ __html: newStr }} />;
    }
    const res = str.replace(matches, `<b>${matches}</b>`);
    return <span className={styles.hint} dangerouslySetInnerHTML={{ __html: res }} />;
  }

  return (
    <>
      <div className={styles.authTitle}>
        <span>Регистрация</span>
      </div>
      <div className={styles.stepTitle}>{step} шаг из 3</div>
      <form onSubmit={handleSubmit(submitForm)}>
        {step === 1 && (
          <>
            <div className={styles.inputWrapper}>
              <input
                ref={loginRef}
                placeholder='Логин'
                className={errors.login || localError === 400 ? styles.inputTextError : styles.inputText}
                name='login'
                {...register('login')}
                onFocus={() => setIsBlur(false)}
                onBlur={(e) => handleBlur(e)}
              />
              <label className={styles.inputLabel} htmlFor='login'>
                Логин
              </label>
              {errors.login?.types.matches && !isBlur ? replacedString(loginStr, errors.login.types.matches) : null}

              {errors.login ? (
                isBlur && <span className={styles.errorMessage}>{loginStr}</span>
              ) : (
                <span className={styles.hint}>{loginStr}</span>
              )}
            </div>

            <div className={styles.inputWrapper}>
              <input
                ref={passRef}
                placeholder='Пароль'
                className={errors.password || localError === 400 ? styles.inputTextError : styles.inputText}
                name='password'
                {...register('password')}
                onFocus={() => setIsBlur(false)}
                onBlur={(e) => handleBlur(e)}
              />
              <label className={styles.inputLabel} htmlFor='password'>
                Пароль
              </label>
              {errors.password?.types.matches && !isBlur
                ? replacedString(passwordStr, errors.password.types.matches)
                : null}

              {errors.password ? (
                isBlur && <span className={styles.errorMessage}>{passwordStr}</span>
              ) : (
                <span className={styles.hint}>{passwordStr}</span>
              )}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className={styles.inputWrapper}>
              <input
                placeholder='Имя'
                name='name'
                {...register('name')}
                className={errors.name || localError === 400 ? styles.inputTextError : styles.inputText}
              />
              <label className={styles.inputLabel} htmlFor='name'>
                Имя
              </label>

              {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
            </div>

            <div className={styles.inputWrapper}>
              <input
                placeholder='Фамилия'
                className={errors.surname || localError === 400 ? styles.inputTextError : styles.inputText}
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
                className={errors.phoneNum || localError === 400 ? styles.inputTextError : styles.inputText}
              />
              <label className={styles.inputLabel} htmlFor='phoneNum'>
                Номер телефона
              </label>

              {errors.phoneNum && <p className={styles.errorMessage}>{errors.phoneNum.message}</p>}
            </div>

            <div className={styles.inputWrapper}>
              <input
                placeholder='E-mail'
                className={errors.email || localError === 400 ? styles.inputTextError : styles.inputText}
              />
              <label className={styles.inputLabel} htmlFor='email'>
                E-mail
              </label>

              {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
            </div>
          </>
        )}

        <button type='submit' className={styles.inputSubmit}>
          {stepBtnTitle()}
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
