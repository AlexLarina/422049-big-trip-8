import {createEventsTemplate} from '../templates/events';

class Event {
  constructor(data) {
    this._data = data;

    this._element = null;
    this._state = {
      isEdit: false
    };
  }

  get template() {
    return createEventsTemplate(this._data);
  }

  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }

    this._element = this.template;
    container.appendChild(this._element);
  }
}


