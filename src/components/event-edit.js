import Component from './component';
import createEventEditTemplate from '../templates/event-edit';
import {createEmpty as createEmptyEvent} from '../models/event';
import flatpickr from 'flatpickr';

export default class EventEditComponent extends Component {
  constructor(data) {
    super(data);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this._onChangePrice = this._onChangePrice.bind(this);
    this._onChangeCity = this._onChangeCity.bind(this);
    this._onChangeTime = this._onChangeTime.bind(this);
  }

  static createMapper(data) {
    return {
      destination: (value) => data.set(`city`, value),
      price: (value) => data.set(`price`, value),
      time: (value) => data.set(`timetable`, value)
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

    return event;
  }

  _onChangePrice(evt) {
    this._newPrice = evt.target.value;
  }

  _onChangeCity(evt) {
    this._newCity = evt.target.value;
  }

  _onChangeTime() {
    flatpickr(`.point__time`, {
      inline: true,
      enableTime: true,
      noCalendar: true
    });
  }

  get template() {
    return createEventEditTemplate(this._data);
  }

  createEventListeners() {
    this._element.querySelector(`.point form`).addEventListener(`submit`, this.handleSubmit);
    this._element.querySelector(`.point form`).addEventListener(`reset`, this.handleReset);

    this._element.querySelector(`.point__price .point__input`).addEventListener(`change`, this._onChangePrice);
    this._element.querySelector(`.point__destination-input`).addEventListener(`change`, this._onChangeCity);
    this._element.querySelector(`.point__time .point__input`).addEventListener(`click`, this._onChangeTime);
  }

  removeEventListeners() {
    this._element.querySelector(`.point form`).removeEventListener(`submit`, this.handleSubmit);
    this._element.querySelector(`.point form`).removeEventListener(`reset`, this.handleReset);

    this._element.querySelector(`.point__price .point__input`).removeEventListener(`change`, this._onChangePrice);
    this._element.querySelector(`.point__destination-input`).removeEventListener(`change`, this._onChangeCity);
    this._element.querySelector(`.point__time .point__input`).removeEventListener(`click`, this._onChangeTime);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point form`));
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

    flatpickr(element.querySelector(`.point__time`), {
      mode: `range`,
      enableTime: true,
      noCalendar: true
    });

    return element;
  }

  unrender() {
    flatpickr(this._element.querySelector(`.myClass`)).destroy();
    super.unrender();
  }

}
