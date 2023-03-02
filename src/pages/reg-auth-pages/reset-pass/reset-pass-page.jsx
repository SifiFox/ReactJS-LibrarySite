import React from 'react';
import { useSelector } from 'react-redux';
import { ForgotForm } from '../../../components/forms/forgot-pass-form';

import { Preloader } from '../../../components/preload-component';

import styles from './forgot-pass.module.scss';

export function ResetPassPage() {
  const isLoad = useSelector((state) => state.loader.isLoad);

  return (
    <div className={styles.root}>
      {isLoad && <Preloader />}
      <div className={styles.wrapper}>
        <div className={styles.authTitle}>Cleverland</div>
        <div className={styles.formWrapper}>
          <ForgotForm />
        </div>
      </div>
    </div>
  );
}
