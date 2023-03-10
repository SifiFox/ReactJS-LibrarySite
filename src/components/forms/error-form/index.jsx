import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './error-form.module.scss';

export function ErrorForm({ handleAuthError, handleRegistrationError, buttonText, title, subtitle, link, type }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === 'auth') {
      handleAuthError(false);
      navigate(link);
    }
    if (type === 'register') {
      handleRegistrationError(false);
      navigate(link);
    }
    // navigate(link);
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
