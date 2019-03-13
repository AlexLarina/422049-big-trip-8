import createEventEditTemplate from '../templates/event-edit';
import createElement from '../create-element';

export default class EventEditComponent {
  constructor(data) {
    this._data = data;

    this._element = null;
  }

  get template() {
    return createEventEditTemplate(this._data);
  }

  unrender() {
    this._element = null;
  }

  render() {
    this._element = createElement(this.template);

    return this._element;
  }

}
