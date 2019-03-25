import createElement from '../lib/create-element';
import cloneDeep from 'lodash.clonedeep';

export default class Component {
  constructor(data) {
    if (new.target === Component) {
      throw new Error(`Can't create an instance of a base class`);
    }

    this._data = cloneDeep(data);
    this._element = null;
  }

  get template() {
    throw new Error(`Template should be defined!`);
  }

  createEventListeners() {
    throw new Error(`Method 'createEventListeners' must be implemented`);
  }

  removeEventListeners() {
    throw new Error(`Method 'removeEventListeners' must be implemented`);
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

  update(data) {

    Array.from(data).forEach(([key, value]) => {
      this._data.set(key, value);
    });
  }
}
