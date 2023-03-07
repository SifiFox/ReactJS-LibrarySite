import * as yup from 'yup';
import { expressions } from '../constants/constants';

export const userSchemaStage1 = yup.object().shape({
  login: yup
    .string()
    .required(`<b>Логин не может быть пустым</b>`)
    .matches(expressions.loginLetter, `латинский алфавит`)
    .matches(expressions.loginNumber, `цифры`),
  // .matches(expressions.loginFull, `Используйте для логина латинский алфавит и цифры`),

  password: yup
    .string()
    .required('Пароль не может быть пустым')
    .matches(expressions.passwordBase, 'не менее 8 символов')
    .matches(expressions.passwordMinOneNum, 'цифрой')
    .matches(expressions.passwordUpperLetter, 'заглавной буквой'),
});

export const userSchemaStage2 = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
});

export const userSchemaStage3 = yup.object().shape({
  phone: yup.string().required(),
  email: yup.string().email().required(),
});
