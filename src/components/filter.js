import Component from './component';
import {createFilterTemplate} from '../templates/filters';

export default class FilterComponent extends Component {
  constructor(data) {
    super(data);

    this.handleFilter = this.handleFilter.bind(this);
  }

  get template() {
    return createFilterTemplate(this._data);
  }

  createEventListeners() {
    this._element.querySelector(`.trip-filter__item`).addEventListener(`click`, this.handleFilter);
  }

  removeEventListeners() {
    this._element.querySelector(`.trip-filter__item`).removeEventListener(`click`, this.handleFilter);
  }

  handleFilter(evt) {
    const filterAttribute = evt.target.getAttribute(`for`);
    if (this.clickCallback) {
      this.clickCallback(filterAttribute);
    }
  }

  onFilterClick(callback) {
    this.clickCallback = callback;
  }

}
