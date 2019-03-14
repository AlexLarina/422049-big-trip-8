import createEventEditTemplate from '../templates/event-edit';
import createElement from '../create-element';

export default class EventEditComponent {
  constructor(data) {
    this._data = data;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this._element = null;
  }

  get template() {
    return createEventEditTemplate(this._data);
  }

  createEventListeners() {
    this._element.querySelector(`.point__button--save`).addEventListener(`click`, this.handleSubmit);
    this._element.querySelector(`.point__button[type='reset']`).addEventListener(`click`, this.handleReset);
  }

  removeEventListeners() {
    this._element.querySelector(`.point__button--save`).removeEventListener(`click`, this.handleSubmit);
    this._element.querySelector(`.point__button[type='reset']`).removeEventListener(`click`, this.handleReset);
  }

  handleSubmit() {
    if (this.submitCallback) {
      this.submitCallback();
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

  unrender() {
    // this.removeEventListeners();
    this._element = null;
  }

  render() {
    this._element = createElement(this.template);
    this.createEventListeners();

    return this._element;
  }

}
