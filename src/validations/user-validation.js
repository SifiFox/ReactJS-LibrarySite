import * as yup from 'yup';
import { expressions } from '../constants/constants';

export const testSchema = [
  yup.object().shape({
    username: yup
      .string()
      .required(`Логин не может быть пустым`)
      .matches(expressions.loginLetter, `латинский алфавит`)
      .matches(expressions.loginNumber, `цифры`),

    password: yup
      .string()
      .required('Пароль не может быть пустым')
      .matches(expressions.passwordBase, 'не менее 8 символов')
      .matches(expressions.passwordMinOneNum, 'цифрой')
      .matches(expressions.passwordUpperLetter, 'заглавной буквой'),
  }),

  yup.object().shape({
    firstName: yup.string().required(`Поле не может быть пустым`),
    lastName: yup.string().required('Поле не может быть пустым'),
  }),
  yup.object().shape({
    phone: yup
      .string()
      .required('Поле не может быть пустым')
      .matches(expressions.phone, 'В формате +375(xx) xxx-xx-xx'),
    email: yup.string().required('Поле не может быть пустым').email('Введите корректный e-mail'),
  }),
];

export const resetPassSchema = yup.object().shape({
  password: yup
    .string()
    .required('Пароль не может быть пустым')
    .matches(expressions.passwordBase, 'не менее 8 символов')
    .matches(expressions.passwordMinOneNum, 'цифрой')
    .matches(expressions.passwordUpperLetter, 'заглавной буквой'),
  confirmPassword: yup.string().required('Поле не может быть пустым'),
});
