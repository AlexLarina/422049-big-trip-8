import Component from './component';
import createEventTemplate from '../templates/event-view';

export default class EventViewComponent extends Component {
  constructor(data) {
    super(data);

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

  update(data) {
    this._data = data;
  }
}
