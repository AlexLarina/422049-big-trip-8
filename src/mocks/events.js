import {
  chooseRandomArrayItems,
  createRandomNumber,
  getRandomArrayItem,
  getRandomObjectValue} from '../random';

const HOUR = {
  MIN: 0,
  MAX: 23
};

const OFFERS_NUMBER = {
  MIN: 0,
  MAX: 2
};

const DESCRIPTION_ITEMS = {
  MIN: 1,
  MAX: 3
};

const OFFERS = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`
];

const TRANSPORT = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const LOCALS = [`Check-in`, `Sightseeing`, `Restaurant`];

const TYPES = {
  'Taxi': `🚕`,
  'Bus': `🚌`,
  'Train': `🚂`,
  'Ship': `🛳️`,
  'Transport': `🚊`,
  'Drive': `🚗`,
  'Flight': `✈️`,
  'Check-in': `🏨`,
  'Sightseeing': `🏛️`,
  'Restaurant': `🍴`
};

const CITIES = [
  `Istanbul`,
  `Izmir`,
  `Ankara`,
  `Adana`,
  `Bursa`,
  `Trabzon`
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const createTimetable = () => {
  const startHour = createRandomNumber(HOUR.MIN, HOUR.MAX);
  const endHour = createRandomNumber(startHour + 1, HOUR.MAX);

  return ({
    start: `${startHour}:00`,
    end: `${endHour}:00`,
    duration: `${endHour - startHour}`
  });
};

const createOffers = () => chooseRandomArrayItems(
    OFFERS,
    createRandomNumber(OFFERS_NUMBER.MIN, OFFERS_NUMBER.MAX)
);

const chooseRandomPicture = () => `http://picsum.photos/300/150?r=${createRandomNumber()}`;

const createDescription = (templateArray) => (
  chooseRandomArrayItems(templateArray, createRandomNumber(DESCRIPTION_ITEMS.MIN, DESCRIPTION_ITEMS.MAX))
    .join(`. `)
);

const createEventFields = () =>({
  type: getRandomObjectValue(TYPES),
  city: getRandomArrayItem(CITIES),
  url: chooseRandomPicture(),
  offers: createOffers(),
  description: createDescription(DESCRIPTIONS),
  date: ``,
  timetable: createTimetable(),
  price: createRandomNumber(),
  getTypes() {
    return TYPES;
  },
  getTransportTypes() {
    return TRANSPORT;
  },
  getLocalTypes() {
    return LOCALS;
  }
});

const createEvent = () => new Map(Object.entries(createEventFields()));

const createNumberRange = (limit) => [...(new Array(limit)).keys()];

export const createEvents = (limit) => createNumberRange(limit).map(() => createEvent());

