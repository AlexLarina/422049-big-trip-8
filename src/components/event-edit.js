import Component from './component';
import createEventEditTemplate from '../templates/event-edit';
import {createEmpty as createEmptyEvent} from '../models/event';
import flatpickr from 'flatpickr';

export default class EventEditComponent extends Component {
  constructor(data, destinations) {
    super(data);
    this.destinations = destinations;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this._onChangePrice = this._onChangePrice.bind(this);
    this._onChangeCity = this._onChangeCity.bind(this);
    this._onChangeTimeStart = this._onChangeTimeStart.bind(this);
  }

  static createMapper(data) {
    return {
      'destination': (value) => data.set(`city`, value),
      'price': (value) => data.set(`price`, value),
      'date_start': (value) => data.set(`timetable`.start, value),
      'date_end': (value) => data.set(`timetable`.end, value)
    };
  }

  _processForm(formData) {
    const event = createEmptyEvent();
    const mapper = EventEditComponent.createMapper(event);

    Array.from(formData.entries()).forEach(([property, value]) => {
      if (mapper[property]) {
        mapper[property](value);
      }
    });

    console.log(event);

    return event;
  }

  _onChangePrice(evt) {
    this._newPrice = evt.target.value;
  }

  _onChangeCity(evt) {
    this._newCity = evt.target.value;
    const event = createEmptyEvent();
    Array.from(this.destinations.values()).forEach((destination) => {
      if (destination.name === evt.target.value) {
        event.city = destination.name;
        event.description = destination.description;
      }
    });
    console.log(event);
    this.update(event);
    // this.render();
  }

  _onChangeTimeStart(evt) {
    console.log(evt.target.value);
    this._newTimeStart = evt.target.value;
    // @TODO обработка виджетов изменения времени
  }

  get template() {
    return createEventEditTemplate(this._data, this.destinations);
  }

  createEventListeners() {
    this._element.querySelector(`.point form`).addEventListener(`submit`, this.handleSubmit);
    this._element.querySelector(`.point form`).addEventListener(`reset`, this.handleReset);

    this._element.querySelector(`.point__price .point__input`).addEventListener(`change`, this._onChangePrice);
    this._element.querySelector(`.point__destination-input`).addEventListener(`change`, this._onChangeCity);
    this._element.querySelector(`.point__time input[name='date-start']`).addEventListener(`change`, this._onChangeTimeStart);
  }

  removeEventListeners() {
    this._element.querySelector(`.point form`).removeEventListener(`submit`, this.handleSubmit);
    this._element.querySelector(`.point form`).removeEventListener(`reset`, this.handleReset);

    this._element.querySelector(`.point__price .point__input`).removeEventListener(`change`, this._onChangePrice);
    this._element.querySelector(`.point__destination-input`).removeEventListener(`change`, this._onChangeCity);
    this._element.querySelector(`.point__time input[name='date-start']`).removeEventListener(`change`, this._onChangeTimeStart);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point form`));
    console.log(Array.from(formData.entries()));
    const eventModel = this._processForm(formData);

    this.update(eventModel);

    if (this.submitCallback) {
      this.submitCallback(eventModel);
    }
  }

  handleReset() {
    if (this.resetCallback) {
      this.resetCallback();
    }
  }

  onSubmit(callback) {
    this.submitCallback = callback;
  }

  onReset(callback) {
    this.resetCallback = callback;
  }

  render() {
    const element = super.render();
    const timeStartElement = this.element.querySelector(`.point__time input[name='date-start']`);
    const timeEndElement = this.element.querySelector(`.point__time input[name='date-end']`);

    this.timeStart = flatpickr(timeStartElement, {
      mode: `range`,
      enableTime: true,
      noCalendar: true
    });

    this.timeEnd = flatpickr(timeEndElement, {
      mode: `range`,
      enableTime: true,
      noCalendar: true
    });

    return element;
  }

  unrender() {
    this.timeStart.destroy();
    this.timeEnd.destroy();

    this.timeStart = null;
    this.timeEnd = null;

    super.unrender();
  }
}
