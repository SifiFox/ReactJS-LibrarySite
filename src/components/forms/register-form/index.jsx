import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './register-form.module.scss';

import arrow from '../../../assets/icons/arrow.svg';
import { testSchema } from '../../../validations/user-validation';
import { RegisterStep1 } from './register-step1';
import { RegisterStep2 } from './register-step2';
import { RegisterStep3 } from './register-step3';
import { useRegistrationMutation } from '../../../redux/slices/api-slice';
import { hideLoader, showLoader } from '../../../redux/slices/loader-slice';

export function RegisterForm({ handleRegistrationError }) {
  const [registration, data, isLoading, error] = useRegistrationMutation();

  const [step, setStep] = React.useState(1);
  const [localError, setLocalError] = React.useState(null);
  const dispatch = useDispatch();
  const stepBtnTitle = () => {
    if (step === 1) {
      return 'следующий шаг';
    }
    if (step === 2) {
      return 'последний шаг';
    }
    return 'зарегистрироваться';
  };

  React.useEffect(() => {
    if (data.isLoading) {
      dispatch(showLoader());
    }

    if (!data.isLoading) {
      dispatch(hideLoader());

      if (data.error) {
        if (data.error.status === 400) {
          setLocalError(data.error.status);
          handleRegistrationError(data.error.status);
        }
        if (data.error.status === 500) {
          setLocalError(data.error.status);
          handleRegistrationError(data.error.status);
        }
      }
    }
  }, [isLoading, data, handleRegistrationError, error, dispatch]);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    getValues,
    setError,
    setFocus,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(testSchema[step - 1]),
    mode: 'all',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });

  const handleRegistration = async (registrationData) => {
    trigger();

    if (step === 3) {
      const ans = await registration(registrationData);
      if (ans.error) {
        handleRegistrationError(ans.error.originalStatus);
      } else {
        handleRegistrationError(200);
      }
    }
    setStep((prev) => prev + 1);
  };

  const onSubmit = (registrationData) => handleRegistration(registrationData);
  return (
    <>
      <div className={styles.authTitle}>
        <span>Регистрация</span>
      </div>
      <div className={styles.stepTitle}>{step} шаг из 3</div>
      <form data-test-id='register-form' onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <RegisterStep1
            styles={styles}
            setError={setError}
            getValues={getValues}
            errors={errors}
            register={register}
            clearErrors={clearErrors}
            setFocus={setFocus}
          />
        )}
        {step === 2 && <RegisterStep2 styles={styles} errors={errors} register={register} />}
        {step === 3 && (
          <RegisterStep3
            styles={styles}
            errors={errors}
            control={control}
            Controller={Controller}
            trigger={trigger}
            getValues={getValues}
            setValue={setValue}
            register={register}
          />
        )}

        <button type='submit' disabled={!isValid && 'disabled'} className={styles.inputSubmit}>
          {stepBtnTitle()}
        </button>

        <div className={styles.registerRow}>
          <span>Есть учетная запись?</span>
          <Link className={styles.registerLink} to='/auth'>
            Войти
            <img src={arrow} alt='arrow' />
          </Link>
        </div>
      </form>
    </>
  );
}
