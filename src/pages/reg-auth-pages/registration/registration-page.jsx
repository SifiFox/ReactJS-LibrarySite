import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Preloader } from '../../../components/preload-component';
import { ErrorForm } from '../../../components/forms/error-form';

import styles from './registration-page.module.scss';

import { RegisterForm } from '../../../components/forms/register-form';

export function RegistrationPage() {
  const [registrationError, setRegistrationError] = React.useState(false);
  const [errorBody, setErrorBody] = React.useState({
    title: '',
    subtitle: '',
    buttonText: '',
    link: '',
  });

  const handleRegistrationError = (error) => {
    if (error) {
      if (error === 500 || error === 405) {
        setErrorBody({
          title: 'Данные не сохранились',
          subtitle: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
          buttonText: 'Повторить',
          link: '/registration',
        });
      }

      if (error === 400) {
        setErrorBody({
          title: 'Данные не сохранились',
          subtitle:
            'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail',
          buttonText: 'Назад к регистрации',
          link: '/registration',
        });
      }

      if (error === 200) {
        setErrorBody({
          title: 'Регистрация успешна',
          subtitle: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
          buttonText: 'Вход',
          link: '/auth',
        });
      }
    }

    setRegistrationError(error);
  };

  const navigate = useNavigate();
  const isLoad = useSelector((state) => state.loader.isLoad);

  React.useEffect(() => {
    if (localStorage.getItem('jwt') && localStorage.getItem('jwt') !== 'null') {
      navigate('/books/all');
    }
  }, [navigate]);

  return (
    <div className={styles.root}>
      {isLoad && <Preloader />}
      <div className={styles.wrapper}>
        <div className={styles.authTitle}>Cleverland</div>
        <div className={styles.formWrapperLayout}>
          <div data-test-id='auth' className={styles.formWrapper}>
            {!registrationError ? (
              <RegisterForm handleRegistrationError={handleRegistrationError} />
            ) : (
              <ErrorForm
                title={errorBody.title}
                subtitle={errorBody.subtitle}
                buttonText={errorBody.buttonText}
                link={errorBody.link}
                handleRegistrationError={handleRegistrationError}
                type='register'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
