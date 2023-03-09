import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { expressions } from '../../../constants/constants';

// import { userSchemaStage1, userSchemaStage2, userSchemaStage3 } from '../../../validations/user-validation';

import styles from './register-form.module.scss';

import passShow from '../../../assets/icons/password-showed.svg';
import passHide from '../../../assets/icons/password-hide.svg';
import arrow from '../../../assets/icons/arrow.svg';
import { testSchema } from '../../../validations/user-validation';
import { RegisterStep1 } from './register-step1';
import { RegisterStep2 } from './register-step2';
import { RegisterStep3 } from './register-step3';
import { useRegistrationMutation } from '../../../redux/slices/api-slice';
import { hideLoader, showLoader } from '../../../redux/slices/loader-slice';

export function RegisterForm(handleRegistrationError) {
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
        } else {
          handleRegistrationError(data.error.status);
        }
      } else {
        console.log(data);
      }
    }
  }, [isLoading, data, handleRegistrationError, error, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(testSchema[step - 1]),
    mode: 'all',
    reValidateMode: 'onBlur',
    criteriaMode: 'all',
  });

  const handleRegistration = async (user) => {
    const ans = await registration(user);
    if (ans.error) {
      console.log(user);
    } else {
      console.log(ans);
    }
  };

  const submitForm = (registrationData) => {
    if (step === 3) {
      console.log(registrationData);
      handleRegistration(registrationData);
    }
    console.log(registrationData);
    setStep((prev) => prev + 1);
  };

  console.log('errors');
  console.log(errors);
  console.log('isValid');
  console.log(isValid);

  return (
    <>
      <div className={styles.authTitle}>
        <span>Регистрация</span>
      </div>
      <div className={styles.stepTitle}>{step} шаг из 3</div>
      <form onSubmit={handleSubmit(submitForm)}>
        {step === 1 && <RegisterStep1 styles={styles} errors={errors} register={register} />}
        {step === 2 && <RegisterStep2 styles={styles} errors={errors} register={register} />}
        {step === 3 && <RegisterStep3 styles={styles} errors={errors} register={register} />}

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

// {
//   errors.password?.types && !isBlur ? replacedString(passwordStr, errors.password.types) : null;
// }

// {
//   errors.password ? (
//     isBlur && <span className={styles.errorMessage}>{passwordStr}</span>
//   ) : (
//     <span className={styles.hint}>{passwordStr}</span>
//   );
// }
