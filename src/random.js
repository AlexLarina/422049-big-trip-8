export const chooseRandomArrayItems = (array, size) => (
  array
    .sort(() => Math.random() - 0.5)
    .slice(0, size)
);

export const createRandomNumber = (min = 1, max = 100) => Math.floor(Math.random() * (max - min)) + min;
