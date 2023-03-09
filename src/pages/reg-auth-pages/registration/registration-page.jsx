import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Preloader } from '../../../components/preload-component';
import { ErrorForm } from '../../../components/forms/error-form';
import { ForgotForm } from '../../../components/forms/forgot-pass-form';

import styles from './registration-page.module.scss';

import arrow from '../../../assets/icons/arrow.svg';
import { RegisterForm } from '../../../components/forms/register-form';

export function RegistrationPage() {
  const isLoad = useSelector((state) => state.loader.isLoad);
  const [registrationError, setRegistrationError] = React.useState(false);

  const handleRegistrationError = (error) => {
    setRegistrationError(error);
  };

  return (
    <div className={styles.root}>
      {isLoad && <Preloader />}
      <div className={styles.wrapper}>
        <div className={styles.authTitle}>Cleverland</div>
        <div className={styles.formWrapperLayout}>
          <div className={styles.formWrapper}>
            {!registrationError ? (
              <RegisterForm handleRegistrationError={handleRegistrationError} />
            ) : (
              <ErrorForm
                title='Вход не выполнен'
                subtitle='Что-то пошло не так. Попробуйте еще раз'
                buttonText='повторить'
                handleRegistrationError={handleRegistrationError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
