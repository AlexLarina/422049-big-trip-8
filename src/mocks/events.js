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
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`
];

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

const CITIES = [`Istanbul`, `Izmir`, `Ankara`, `Adana`, `Bursa`, `Trabzon`];

const DESCRIPTION_TEMPLATE = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Cras aliquet varius magna, non porta ligula feugiat eget.
  Fusce tristique felis at fermentum pharetra.
  Aliquam id orci ut lectus varius viverra.
  Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.
  Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.
  Sed sed nisi sed augue convallis suscipit in sed felis.
  Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus.
  In rutrum ac purus sit amet tempus.`;

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
    createRandomNumber(0, 2)
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

// пример реализации выбранных структур для точек маршрута

const chooseRandomType = (types) => {
  const keys = Object.keys(types);
  return types[keys[createRandomNumber(0, keys.length - 1)]];
};

const chooseRandomPicture = () => `http://picsum.photos/300/150?r=${createRandomNumber()}`;

const createDescription = (template) => chooseRandomArrayItems(template.split(`.`), createRandomNumber(1, 3)).join(`. `);

const createEventFields = () =>({
  type: chooseRandomType(TYPES),
  city: CITIES[createRandomNumber(0, CITIES.length - 1)],
  url: chooseRandomPicture(),
  offers: createOffers(),
  description: createDescription(DESCRIPTION_TEMPLATE),
  date: ``,
  timetable: createTimetable(),
  price: createRandomNumber()
});

const createEvent = (fields) => new Map(Object.entries(fields));

export const createEventsExample = (limit) => [...(new Array(limit)).keys()].map(() => createEvent(createEventFields()));
