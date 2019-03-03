import {createFilters} from './mocks/filters';
import {createEvents, createOffers} from './mocks/events';

import {createFiltersTemplate} from './templates/filters';
import {createEventsTemplate} from './templates/events';

const EVENTS_LIMIT = 4;

const filters = createFilters();
const events = createEvents(EVENTS_LIMIT);
const offers = createOffers(EVENTS_LIMIT);


const filtersContainerElement = document.querySelector(`.trip-filter`);
filtersContainerElement.innerHTML = createFiltersTemplate(filters);

const eventsContainerElement = document.querySelector(`.trip-day__items`);
eventsContainerElement.innerHTML = createEventsTemplate(events, offers);
