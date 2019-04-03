import {capitalize} from './lib/filterate';

const DAY_MS = 24 * 60 * 60 * 1000;
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
    this.pictures = data.destination.pictures;// data.destination.pictures[0].src;
    this.offers = data.offers;
    this.description = data.destination.description;
    this.date = new Date(data[`date_from`]).getDate();
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
    // console.log(new Map(Object.entries(new ModelEvent(data))));
    return new Map(Object.entries(new ModelEvent(data)));
  }

  static doParsingEvents(data) {
    //console.log(data.map(ModelEvent.doParsingEvent));
    return data.map(ModelEvent.doParsingEvent);
  }

  static sortEventsByDate(data) {
    const daysData = ModelEvent.doParsingEvents(data);
    console.log(daysData);
    const allDaysArray = [];
    for (let i = 1; i < daysData.length; i++) {
      let dayArray = [];
      dayArray.push(daysData[i - 1]);
      // console.log(daysData[i - 1].get(`date`));
      if (daysData[i].get(`date`) - daysData[i - 1].get(`date`) < 1) {
        // debugger;
        dayArray.push(daysData[i]);
      } else {
        allDaysArray.push(dayArray);
        i++;
      }
    }

    console.log(allDaysArray);
    return allDaysArray;
  }
}
