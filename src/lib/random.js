export const chooseRandomArrayItems = (array, size) => (
  array
    .sort(() => Math.random() - 0.5)
    .slice(0, size)
);

export const createRandomNumber = (min = 1, max = 100) => Math.floor(Math.random() * (max - min)) + min;

export const getRandomArrayItem = (array) => array[createRandomNumber(0, array.length - 1)];

export const getRandomObjectValue = (object) => {
  const keys = Object.keys(object);
  return object[keys[createRandomNumber(0, keys.length - 1)]];
};

export const createRandomDate = (msRange) => {
  const now = new Date().getTime();
  const date = new Date(now + createRandomNumber(-msRange, msRange));

  return date;
};
