import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ErrorForm } from '../../../components/forms/error-form';
import { ForgotForm } from '../../../components/forms/forgot-pass-form';

import { Preloader } from '../../../components/preload-component';

import styles from './forgot-pass.module.scss';

import arrow from '../../../assets/icons/arrow.svg';
import { ResetForm } from '../../../components/forms/reset-pass-form';

export function ForgotPassPage() {
  const [forgotSuccess, setForgetSuccess] = React.useState(false);
  const isLoad = useSelector((state) => state.loader.isLoad);

  const location = useLocation();

  const handleForgetSuccess = () => {
    setForgetSuccess(true);
  };

  React.useEffect(() => {
    setForgetSuccess(false);
  }, []);

  const { search } = location;
  const code = new URLSearchParams(search).get('code');
  console.log(code);

  return (
    <div className={styles.root}>
      {/* {isLoad && <Preloader />} */}
      <div className={styles.wrapper}>
        <div className={styles.authTitle}>Cleverland</div>

        {!code ? (
          <div className={styles.formWrapperLayout}>
            {!forgotSuccess && (
              <div className={styles.moveBack}>
                <Link className={styles.registerLink} to='/auth'>
                  <img src={arrow} alt='arrow' />
                  <span>вход в личный кабинет</span>
                </Link>
              </div>
            )}

            <div className={styles.formWrapper}>
              {forgotSuccess ? (
                <ErrorForm
                  title='Письмо выслано'
                  subtitle='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
                />
              ) : (
                <ForgotForm handleForgetSuccess={handleForgetSuccess} />
              )}
            </div>
          </div>
        ) : (
          <div className={styles.formWrapperLayout}>
            <div className={styles.formWrapper}>
              {forgotSuccess ? (
                <ErrorForm
                  title='Письмо выслано'
                  subtitle='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
                />
              ) : (
                <ResetForm resetCode={code} handleForgetSuccess={handleForgetSuccess} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
