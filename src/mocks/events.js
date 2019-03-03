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
  let startHour = createRandomNumber(HOUR.MIN, HOUR.MAX);
  let endHour = createRandomNumber(HOUR.MIN, HOUR.MAX);
  while (endHour <= startHour) {
    endHour = createRandomNumber(HOUR.MIN, HOUR.MAX);
  }

  return ({
    start: `${startHour}:00`,
    end: `${endHour}:00`
  });
};

export const createEvents = (limit) => (
  [...(new Array(limit)).keys()].map((_, index) => ({
    title: TITLES[index],
    icon: ICONS[index],
    timetable: createTimetable(),
    price: createRandomNumber()
  }))
);

export const createOffers = (limit) => (
  [...(new Array(limit)).keys()].map(() => {
    return chooseRandomArrayItems(OFFERS, createRandomNumber(0, OFFERS.length - 1));
  })
);
