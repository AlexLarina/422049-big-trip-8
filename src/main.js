import EventViewComponent from './components/event-view';
import EventEditComponent from './components/event-edit';
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
  const componentView = new EventViewComponent(event);
  eventsContainerElement.appendChild(componentView.render());
  // console.log(componentView.render());
  componentView.onClick(() => {
    const componentEdit = new EventEditComponent(event);
    // console.log(componentEdit.render());
    eventsContainerElement.replaceChild(componentEdit.render(), componentView.render());
    console.log('BOOM!');
  });
});

