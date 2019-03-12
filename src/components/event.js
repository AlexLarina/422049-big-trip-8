import createEventTemplate from '../templates/event';
import createElement from '../create-element';

export default class EventComponent {
  constructor(data) {
    this._data = data; // @TODO: deep clone

    this._element = null;
    this._state = {
      isEdit: false
    };

    this.clickCallback = null;
    this.handleClick = this.handleClick.bind(this);
  }

  get template() {
    return createEventTemplate(this._data);
  }

  createEventListeners() {
    this._element.addEventListener(`click`, this.handleClick);
  }

  removeEventListeners() {
    this._element.removeEventListener(`click`, this.handleClick);
  }

  handleClick() {
    if (this.clickCallback) {
      this.clickCallback();
    }
  }

  onClick(callback) {
    this.clickCallback = callback;
  }

  unrender() {
    this.removeEventListeners();
    this._element = null;
  }

  render() {
    this._element = createElement(this.template);
    this.createEventListeners();

    return this._element;
  }
}
