import {chooseRandomArrayItems, createRandomNumber} from '../random';

const HOUR = {
  MIN: 0,
  MAX: 23
};

const TITLES = [
  `Taxi to Airport`,
  `Flight to Geneva`,
  `Drive to Chamonix`,
  `Check into a hotel`
];

const ICONS = [`🚕`, `✈️`, `🚗`, `🏨`];

const OFFERS = [
  `Order UBER`,
  `Add breakfast`,
  `Rent a car`,
  `Select meal`,
  `Upgrade to business`
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
    createRandomNumber(0, OFFERS.length - 1)
);

export const createEvents = (limit) => (
  [...(new Array(limit)).keys()].map((_, index) => ({
    title: TITLES[index],
    icon: ICONS[index],
    timetable: createTimetable(),
    price: createRandomNumber(),
    offers: createOffers(),
  }))
);
