import createElement from '../create-element';

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't create an instance of a base class`);
    }

    this._element = null;
  }

  get template() {
    throw new Error(`Template should be defined!`);
  }

  createEventListeners() {
  }

  removeEventListeners() {
  }

  render() {
    this._element = createElement(this.template);
    this.createEventListeners();
    return this._element;
  }

  unrender() {
    this.removeEventListeners();
    this._element = null;
  }
}
