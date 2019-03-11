import Event from './components/event';
import {createFilters} from './mocks/filters';
import {createEvents} from './mocks/events';

import {createFiltersTemplate} from './templates/filters';
import {createEventsTemplate} from './templates/events';

const EVENTS_LIMIT = 4;

const filters = createFilters();
const events = createEvents(EVENTS_LIMIT);

const filtersContainerElement = document.querySelector(`.trip-filter`);
const eventsContainerElement = document.querySelector(`.trip-day__items`);

filtersContainerElement.innerHTML = createFiltersTemplate(filters);
// eventsContainerElement.innerHTML = createEventsTemplate(events);

const eventElements = new Event(events);
eventElements.render(eventsContainerElement);

