import {capitalize} from './lib/filterate';

const MONTHS = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];
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

export default class ModelEvent {
  constructor(data) {
    this.type = TYPES[capitalize(data.type)];
    this.city = data.destination.name;
    this.pictures = data.destination.pictures;
    this.offers = data.offers;
    this.description = data.destination.description;
    this.dateDayNumber = new Date(data[`date_from`]).getDate();
    this.date = `${new Date(data[`date_from`]).getDate()} ${MONTHS[new Date(data[`date_from`]).getMonth()]}`;
    this.timetable = {
      start: `${new Date(data[`date_from`]).getHours()}:00`,
      end: `${new Date(data[`date_to`]).getHours()}:00`,
      duration: `${new Date(data[`date_to`] - data[`date_from`]).getHours()}`
    };
    this.price = data[`base_price`];
    this.isFavourite = data[`is_favorite`];
    this.transportTypes = TRANSPORT.slice();
    this.localTypes = LOCALS.slice();
    this.types = Object.assign({}, TYPES);
  }

  static doParsingEvent(data) {
    return new Map(Object.entries(new ModelEvent(data)));
  }

  static doParsingEvents(data) {
    return data.map(ModelEvent.doParsingEvent);
  }

  static sortEventsByDate(data) {
    const daysData = ModelEvent.doParsingEvents(data);
    const allDaysArray = [];
    let dayArray = [];
    for (let i = 1; i < daysData.length; i++) {
      dayArray.push(daysData[i - 1]);
      if (daysData[i].get(`dateDayNumber`) - daysData[i - 1].get(`dateDayNumber`) < 1) {
        dayArray.push(daysData[i]);
        i++;
      } else {
        allDaysArray.push(dayArray);
        dayArray = [];
      }
    }
    return allDaysArray;
  }
}
