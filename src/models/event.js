export const createEmpty = () => new Map(Object.entries({
  type: `🚕`,
  city: ``,
  url: ``,
  offers: [`Add luggage`, `Switch to comfort class`, `Add meal`],
  description: ``,
  date: ``,
  timetable: ``,
  price: ``,
  transportTypes: [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`],
  localTypes: [`Check-in`, `Sightseeing`, `Restaurant`],
  types: {
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
  }
}));
