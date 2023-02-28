import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './error-form.module.scss';

export function ErrorForm({ handleAuthError }) {
  const navigate = useNavigate();

  const handleClick = () => {
    handleAuthError(false);
    navigate('/auth');
  };

  return (
    <div className={styles.errorFormContent}>
      <div className={styles.authTitle}>
        <span>Вход в личный кабинет</span>
      </div>

      <span className={styles.errorSubtitle}>Что-то пошло не так. Попробуйте ещё раз</span>

      <button type='submit' onClick={handleClick} className={styles.inputSubmit}>
        повторить
      </button>
    </div>
  );
}
