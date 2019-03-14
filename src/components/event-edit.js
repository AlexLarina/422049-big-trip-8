import createEventEditTemplate from '../templates/event-edit';
import createElement from '../create-element';

export default class EventEditComponent {
  constructor(data) {
    this._data = data;

    this.handleClick = this.handleClick.bind(this);
    this._element = null;
  }

  get template() {
    return createEventEditTemplate(this._data);
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
    this._element = null;
  }

  render() {
    this._element = createElement(this.template);
    this.createEventListeners();

    return this._element;
  }

}
