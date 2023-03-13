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
  const [forgotError, setForgetError] = React.useState(false);
  const [errorBody, setErrorBody] = React.useState();

  const isLoad = useSelector((state) => state.loader.isLoad);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleForgetSuccess = () => {
    setForgetSuccess(true);
  };
  const { search } = location;
  const code = new URLSearchParams(search).get('code');

  const handleForgetError = (error) => {
    console.log(error);

    if (error) {
      if (error !== 200) {
        setErrorBody({
          title: 'Данные не сохранились',
          subtitle: 'Что-то пошло не так. Попробуйте еще раз',
          buttonText: 'повторить',
          link: `/forgot-pass?code=${code}`,
        });
      }
      if (error === 200) {
        setErrorBody({
          title: 'Новые данные сохранены',
          subtitle: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
          buttonText: 'вход',
          link: '/auth',
          type: 'reset',
        });
      }
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem('jwt') && sessionStorage.getItem('jwt') !== 'null') {
      navigate('/books/all');
    }
    setForgetSuccess(false);
    if (code) {
      dispatch(hideLoader());
    }
  }, [navigate, code, dispatch]);

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

            <div data-test-id='auth' className={styles.formWrapper}>
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
            <div data-test-id='auth' className={styles.formWrapper}>
              {forgotSuccess ? (
                <ErrorForm
                  title='Письмо выслано'
                  subtitle='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
                />
              ) : errorBody ? (
                <ErrorForm
                  title={errorBody.title}
                  subtitle={errorBody.subtitle}
                  buttonText={errorBody.buttonText}
                  link={errorBody.link}
                  type={errorBody.type}
                  handleForgetError={handleForgetError}
                />
              ) : errorBody ? (
                <ErrorForm
                  title={errorBody.title}
                  subtitle={errorBody.subtitle}
                  buttonText={errorBody.buttonText}
                  link={errorBody.link}
                  type={errorBody.type}
                  handleForgetError={handleForgetError}
                />
              ) : (
                <ResetForm
                  resetCode={code}
                  handleForgetError={handleForgetError}
                  handleForgetSuccess={handleForgetSuccess}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
