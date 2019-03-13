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
  const componentViewElement = componentView.render();
  eventsContainerElement.appendChild(componentViewElement);
  componentView.onClick(() => {
    const componentEdit = new EventEditComponent(event);
    const componentEditElement = componentEdit.render();
    eventsContainerElement.replaceChild(componentEditElement, componentViewElement);
    componentViewElement.unrender();
    console.log(`BOOM!`);
  });
});

