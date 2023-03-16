import { checkDateIsEqual } from './check-date-is-equal';

export const checkIsTomorow = (date) => {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  return checkDateIsEqual(date, tomorrow);
};
