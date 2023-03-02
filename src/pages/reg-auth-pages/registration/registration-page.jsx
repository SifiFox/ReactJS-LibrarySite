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

  // Password regexp (?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}
  // login regexp ^(?=^.{1,}$)((?=.*\d)(?=.*[a-zA-Z]))[0-9a-zA-Z]*$

  return (
    <div className={styles.root}>
      {/* {isLoad && <Preloader />} */}
      <div className={styles.wrapper}>
        <div className={styles.authTitle}>Cleverland</div>
        <div className={styles.formWrapperLayout}>
          <div className={styles.formWrapper}>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
