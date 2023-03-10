export const baseUrl = 'https://strapi.cleverland.by';
export const baseBooksUrl = '/books/';

export const expressions = {
  passwordBase: /(?=.*[a-zA-Z0-9]{8,})/,
  passwordUpperLetter: /(?=.*[A-ZА-Я])/,
  passwordMinOneNum: /(?=.*\d).{1,}/,
  loginLetter: /(?=.*[a-zA-Z]).{1,}/,
  loginNumber: /(?=.*\d).{1,}/,
  loginFull: /^(?=^.{1,}$)((?=.*\d)(?=.*[a-zA-Z]))[0-9a-zA-Z]*$/,
  minEightSymbol: /[0-9a-zA-Z]{8,}/,
  phone: /\+375 \((?:25|29|33|44)\) \d\d\d-\d\d-\d\d/,
  email:
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
};

export const loginStr = 'Используйте для логина латинский алфавит и цифры';
export const passwordStr = 'пароль не менее 8 символов, с заглавной буквой и цифрой';
export const firstNameStr = 'Поле не может быть пустым';
export const lastNameStr = 'Поле не может быть пустым';
export const phoneStr = 'В формате +375(xx) xxx-xx-xx';
export const emailStr = 'Введите корректный e-mail';
