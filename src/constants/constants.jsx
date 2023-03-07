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
  phone:
    /^\+?375((\s\(33\)\s\d{3}-\d{2}-\d{2})|(\s\(29\)\s\d{3}-\d{2}-\d{2})|(\s\(44\)\s\d{3}-\d{2}-\d{2})|(\s\(25\)\s\d{3}-\d{2}-\d{2}))\s*$/,
  email:
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
};
