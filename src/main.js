import EventComponent from './components/event';
import {createFilters} from './mocks/filters';
import {createEvents} from './mocks/events';

import {createFiltersTemplate} from './templates/filters';

const EVENTS_LIMIT = 4;

const filters = createFilters();
const events = createEvents(EVENTS_LIMIT);

const filtersContainerElement = document.querySelector(`.trip-filter`);
const eventsContainerElement = document.querySelector(`.trip-day__items`);

filtersContainerElement.innerHTML = createFiltersTemplate(filters);

events.forEach((event) => {
  const component = new EventComponent(event);

  component.onClick(() => {
    console.log('BOOM!');
  });

  eventsContainerElement.appendChild(component.render());
});

