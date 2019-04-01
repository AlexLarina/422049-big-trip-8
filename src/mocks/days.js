import {createRandomDate} from '../lib/random';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MONTHS = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

const createDate = (number) => {
  const randomDate = createRandomDate(2 * WEEK_MS);

  return {
    'date-timestamp': randomDate,
    'day_number': number,
    'date': `${randomDate.getDay()} ${MONTHS[randomDate.getMonth()]}`
  };
};

export const createDays = (limit) => {
  return [...(new Array(limit)).keys()].map((key) => createDate(key + 1));
};

