import {
  chooseRandomArrayItems,
  createRandomNumber,
  getRandomArrayItem,
  getRandomObjectValue} from '../lib/random';

const MIN_HOUR = 0;
const MAX_HOUR = 23;

const MIN_OFFERS = 0;
const MAX_OFFERS = 2;

const MIN_DESCRIPTION_ITEMS = 1;
const MAX_DESCRIPTION_ITEMS = 3;

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
  const startHour = createRandomNumber(MIN_HOUR, MAX_HOUR);
  const endHour = createRandomNumber(startHour + 1, MAX_HOUR);

  return ({
    start: `${startHour}:00`,
    end: `${endHour}:00`,
    duration: `${endHour - startHour}`
  });
};

const createOffers = () => chooseRandomArrayItems(
    OFFERS,
    createRandomNumber(MIN_OFFERS, MAX_OFFERS)
);

const chooseRandomPicture = () => `http://picsum.photos/300/150?r=${createRandomNumber()}`;

const createDescription = (templateArray) => (
  chooseRandomArrayItems(templateArray, createRandomNumber(MIN_DESCRIPTION_ITEMS, MAX_DESCRIPTION_ITEMS))
    .join(`. `)
);

const createEventFields = () => ({
  type: getRandomObjectValue(TYPES),
  city: getRandomArrayItem(CITIES),
  url: chooseRandomPicture(),
  offers: createOffers(),
  description: createDescription(DESCRIPTIONS),
  date: ``,
  timetable: createTimetable(),
  price: createRandomNumber(),
  transportTypes: TRANSPORT.slice(),
  localTypes: LOCALS.slice(),
  types: Object.assign({}, TYPES)
});

const createEvent = () => new Map(Object.entries(createEventFields()));

const createNumberRange = (limit) => [...(new Array(limit)).keys()];

export const createEvents = (limit) => createNumberRange(limit).map(() => createEvent());

