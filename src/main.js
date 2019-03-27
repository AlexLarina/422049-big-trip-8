import 'flatpickr/dist/flatpickr.min.css';

import EventViewComponent from './components/event-view';
import EventEditComponent from './components/event-edit';
import TripDayComponent from './components/trip-day';
import FilterComponent from './components/filter';

import {createFilters} from './mocks/filters';
import {createEvents} from './mocks/events';
import {createDays} from './mocks/days';


const EVENTS_LIMIT = 2;
const DAYS_LIMIT = 7;

const filters = createFilters();
const days = createDays(DAYS_LIMIT);

const tripPointsContainerElement = document.querySelector(`.trip-points`);
const filtersContainerElement = document.querySelector(`.trip-filter`);
const TripPointContainer = document.querySelector(`trip-points`);

const filterateDays = (attribute, daysData) => {
  let filteredDays;
  switch (attribute) {
    case `filter-everything`:
      break;
    case `filter-future`:
      break;
    case `filter-past`:
      filteredDays = daysData.filter((it) => it[`date-timestamp`] < Date.now());
  }

  return filteredDays;
};

const renderDays = (daysData) => {
  daysData.forEach((day) => {
    const tripDay = new TripDayComponent(day);
    const tripDayElement = tripDay.render();
    tripPointsContainerElement.appendChild(tripDayElement);

    tripDay.onClick(() => {
      // @TODO
    });

    const eventsContainerElement = tripDayElement.querySelector(`.trip-day__items`);
    let events = createEvents(EVENTS_LIMIT);

    events.forEach((event) => {
      const componentView = new EventViewComponent(event);
      const componentEdit = new EventEditComponent(event);

      let componentViewElement = componentView.render();
      let componentEditElement;

      eventsContainerElement.appendChild(componentViewElement);

      componentView.onClick(() => {
        componentEditElement = componentEdit.render();
        eventsContainerElement.replaceChild(componentEditElement, componentViewElement);
        componentView.unrender();
      });

      componentEdit.onSubmit((newObject) => {
        componentView.update(newObject);

        componentViewElement = componentView.render();
        eventsContainerElement.replaceChild(componentViewElement, componentEditElement);
        componentEdit.unrender();

      });

      componentEdit.onReset(() => {
        eventsContainerElement.removeChild(componentEditElement);
        componentEdit.unrender();
      });
    });

  });
};

const removeAllChildNodes = (parentNode) => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
};

renderDays(days);


filters.forEach((filter) => {
  const filterItem = new FilterComponent(filter);
  const filterElement = filterItem.render();
  filtersContainerElement.appendChild(filterElement);

  filterItem.onFilterClick((filterAttribute) => {
    let filteredDays = filterateDays(filterAttribute, days);
    removeAllChildNodes(TripPointContainer);
    renderDays(filteredDays);
  });
});

