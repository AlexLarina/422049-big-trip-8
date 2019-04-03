import Component from './component';
import {createTripDayTemplate} from '../templates/trip-day';
import flatpickr from 'flatpickr';

export default class TripDayComponent extends Component {
  constructor(dayNumber, date) {
    super();
    this.dayNumber = dayNumber;
    this.date = date;

    this.handleClick = this.handleClick.bind(this);
  }

  get template() {
    return createTripDayTemplate(this.dayNumber, this.date);
  }

  createEventListeners() {
    this._element.querySelector(`.trip-day__number`).addEventListener(`click`, this.handleClick);
  }

  removeEventListeners() {
    this._element.querySelector(`.trip-day__number`).removeEventListener(`click`, this.handleClick);
  }

  handleClick() {
    if (this.clickCallback) {
      flatpickr(`.trip-day__title`, {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`,
        inline: true
      });
    }
  }

  onClick(callback) {
    this.clickCallback = callback;
  }
}
