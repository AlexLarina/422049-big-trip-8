import Component from './component';
import createEventEditTemplate from '../templates/event-edit';

export default class EventEditComponent extends Component {
  constructor(data) {
    super(data);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this._onChangePrice = this._onChangePrice.bind(this);
    this._onChangeCity = this._onChangeCity.bind(this);
  }

  _processForm(formData) {
    const entry = {
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
    };

    const eventEditMapper = EventEditComponent.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (eventEditMapper[property]) {
        eventEditMapper[property](value);
      }
    }

    return new Map(Object.entries(entry));
  }

  _onChangePrice(evt) {
    this._newPrice = evt.target.value;
  }

  _onChangeCity(evt) {
    this._newCity = evt.target.value;
  }

  get template() {
    return createEventEditTemplate(this._data);
  }

  createEventListeners() {
    this._element.querySelector(`.point form`).addEventListener(`submit`, this.handleSubmit);
    this._element.querySelector(`.point form`).addEventListener(`reset`, this.handleReset);

    this._element.querySelector(`.point__price .point__input`).addEventListener(`change`, this._onChangePrice);
    this._element.querySelector(`.point__destination-input`).addEventListener(`change`, this._onChangeCity);
  }

  removeEventListeners() {
    this._element.querySelector(`.point form`).removeEventListener(`submit`, this.handleSubmit);
    this._element.querySelector(`.point form`).removeEventListener(`reset`, this.handleReset);

    this._element.querySelector(`.point__price .point__input`).removeEventListener(`change`, this._onChangePrice);
    this._element.querySelector(`.point__destination-input`).removeEventListener(`change`, this._onChangeCity);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point form`));
    const newData = this._processForm(formData);

    this.update(newData);

    if (this.submitCallback) {
      this.submitCallback(newData);
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

  update(data) {
    this._data = data;
  }

  static createMapper(data) {
    return {
      destination: (value) => (data.city = value),
      price: (value) => (data.price = value),
      time: (value) => (data.timetable = value)
    };
  }

}
