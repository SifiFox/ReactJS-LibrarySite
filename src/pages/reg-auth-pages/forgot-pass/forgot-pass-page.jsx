import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ErrorForm } from '../../../components/forms/error-form';
import { ForgotForm } from '../../../components/forms/forgot-pass-form';

import { Preloader } from '../../../components/preload-component';

import styles from './forgot-pass.module.scss';

import arrow from '../../../assets/icons/arrow.svg';
import { ResetForm } from '../../../components/forms/reset-pass-form';
import { hideLoader } from '../../../redux/slices/loader-slice';

export function ForgotPassPage() {
  const [forgotSuccess, setForgetSuccess] = React.useState(false);
  const isLoad = useSelector((state) => state.loader.isLoad);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleForgetSuccess = () => {
    setForgetSuccess(true);
  };
  const { search } = location;
  const code = new URLSearchParams(search).get('code');
  React.useEffect(() => {
    if (sessionStorage.getItem('jwt') && sessionStorage.getItem('jwt') !== 'null') {
      navigate('/books/all');
    }
    setForgetSuccess(false);
    if (code) {
      dispatch(hideLoader());
    }
  }, [navigate, code, dispatch]);

  console.log(isLoad);

  return (
    <div className={styles.root}>
      {isLoad && <Preloader />}
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
