import React from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { useUserLoginMutation } from '../../../redux/slices/api-slice';
import { setToken, logOut } from '../../../redux/slices/auth-slice';

import styles from './auth-form.module.scss';

export function AuthForm() {
  const dispatch = useDispatch();

  const [userLogin] = useUserLoginMutation();

  const user = useSelector((state) => state.auth);

  const handleLogin = async (data) => {
    dispatch(setToken(await userLogin(data)));
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => handleLogin(data);

  return (
    <>
      <div className={styles.authTitle}>Вход в личный кабинет</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder='Логин'
          {...register('identifier', {
            required: 'Поле не может быть пустым',
            minLength: {
              value: 2,
              message: 'Min length is 2',
            },
          })}
        />
        {errors.identifier && <p>{errors.identifier.message}</p>}

        <input
          placeholder='Пароль'
          {...register('password', {
            required: 'Поле не может быть пустым',
            minLength: {
              value: 2,
              message: 'Min length is 2',
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input type='submit' />
      </form>

      <button onClick={handleLogin} type='button'>
        Login
      </button>
      <button onClick={handleLogOut} type='button'>
        LogOut
      </button>
    </>
  );
}
