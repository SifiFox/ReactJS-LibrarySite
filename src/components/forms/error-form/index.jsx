import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './error-form.module.scss';

export function ErrorForm({ handleAuthError, buttonText, title, subtitle }) {
  const navigate = useNavigate();

  const handleClick = () => {
    handleAuthError(false);
    navigate('/auth');
  };

  return (
    <div className={styles.errorFormContent}>
      <div className={styles.authTitle}>
        <span>{title}</span>
      </div>

      <span className={styles.errorSubtitle}>{subtitle}</span>

      {buttonText && (
        <button type='submit' onClick={handleClick} className={styles.inputSubmit}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
