import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useLocation } from 'react-router-dom';

import { AuthForm } from '../../../components/forms/auth-form';
import { ErrorForm } from '../../../components/forms/error-form';
import { Preloader } from '../../../components/preload-component';
import styles from './auth-page.module.scss';

export function AuthPage() {
  const [authError, setAuthError] = React.useState(false);

  const handleAuthError = (error) => {
    setAuthError(error);
  };

  const navigate = useNavigate();
  const isLoad = useSelector((state) => state.loader.isLoad);
  const user = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    if (localStorage.getItem('jwt') && sessionStorage.getItem('jwt') !== 'null') {
      navigate('/books/all');
    } else {
      navigate('/auth');
    }
  }, [navigate, user]);

  return (
    <div className={styles.root}>
      {isLoad && <Preloader />}
      <div data-test-id='auth' className={styles.wrapper}>
        <div className={styles.authTitle}>Cleverland</div>

        <div className={styles.formWrapperLayout}>
          <div className={styles.formWrapper}>
            {!authError ? (
              <AuthForm handleAuthError={handleAuthError} />
            ) : (
              <ErrorForm
                title='Вход не выполнен'
                subtitle='Что-то пошло не так. Попробуйте еще раз'
                buttonText='повторить'
                handleAuthError={handleAuthError}
                link='/auth'
                type='auth'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
