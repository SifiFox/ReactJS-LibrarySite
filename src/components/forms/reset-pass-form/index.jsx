import React from 'react';

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { expressions } from '../../../constants/constants';

import { userSchemaStage1 } from '../../../validations/user-validation';

import styles from './reset-form.module.scss';

import passShow from '../../../assets/icons/password-showed.svg';
import passHide from '../../../assets/icons/password-hide.svg';
import arrow from '../../../assets/icons/arrow.svg';

export function ResetForm({ resetCode, handleForgetSuccess }) {
  return (
    <>
      <div className={styles.authTitle}>
        <span>Восстановление</span>
      </div>
      <div>test</div>
    </>
  );
}
