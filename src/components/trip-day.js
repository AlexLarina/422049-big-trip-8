import Component from './component';
import {createTripDayTemplate} from '../templates/trip-day';
import flatpickr from 'flatpickr';

export default class TripDayComponent extends Component {
  constructor(data) {
    super(data);

    this.handleClick = this.handleClick.bind(this);
  }

  get template() {
    return createTripDayTemplate(this._data);
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
