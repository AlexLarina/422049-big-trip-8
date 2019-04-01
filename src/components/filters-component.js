import Component from './component';
import Filter from './filter';
import {createFiltersTemplate} from '../templates/filters';

export default class FiltersComponent extends Component {
  constructor(data) {
    super(data);

    this.components = null;
    this._onChange = null;
  }

  get template() {
    return createFiltersTemplate(this._data);
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  createEventListeners() {

  }

  removeEventListeners() {

  }

  render() {
    const element = super.render();

    this.components = this._data.map((filterData) => {
      const component = new Filter(filterData);

      element.appendChild(component.render());

      component.onSelect = (filterId) => {
        if (typeof this._onChange === `function`) {
          this._onChange(filterId);
        }
      };

      return component;
    });

    return element;
  }

  unrender() {
    this.components.forEach((component) => {
      this.element.removeChild(component.element);
      component.unrender();
    });

    this.components = null;

    super.unrender();
  }

  // onFiltate(filterId, daysData) {
  //   this.filterateDays(filterId, daysData);
  // }

  // filterateDays(attribute, daysData) {
  //   let filteredDays;
  //   switch (attribute) {
  //     case `filter-everything`:
  //       filteredDays = daysData;
  //       filteredDays.map((it, index) => {
  //         it[`day_number`] = index + 1;
  //       });
  //       break;
  //     case `filter-future`:
  //       filteredDays = daysData
  //         .filter((it) => it[`date-timestamp`] > Date.now());

  //       filteredDays.map((it, index) => {
  //         it[`day_number`] = index + 1;
  //       });
  //       break;
  //     case `filter-past`:
  //       filteredDays = daysData
  //         .filter((it) => it[`date-timestamp`] < Date.now());
  //       filteredDays.map((it, index) => {
  //         it[`day_number`] = index + 1;
  //       });
  //       break;
  //   }

  //   return filteredDays;
  // }
}
