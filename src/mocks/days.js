import {createRandomNumber} from '../lib/random';

const createDate = (number) => {
  return {
    'day_number': number,
    'date': createRandomNumber(1, 30) + ` Apr`
  };
};

export const createDays = (limit) => {
  return [...(new Array(limit)).keys()].map((key) => createDate(key + 1));
};

