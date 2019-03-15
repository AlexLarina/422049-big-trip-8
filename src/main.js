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
  const componentEdit = new EventEditComponent(event);

  let componentViewElement = componentView.render();
  let componentEditElement;

  eventsContainerElement.appendChild(componentViewElement);

  componentView.onClick(() => {
    componentEditElement = componentEdit.render();
    eventsContainerElement.replaceChild(componentEditElement, componentViewElement);
    componentView.unrender();
  });

  componentEdit.onSubmit(() => {
    componentViewElement = componentView.render();
    eventsContainerElement.replaceChild(componentViewElement, componentEditElement);
    componentEdit.unrender();
  });

  componentEdit.onReset(() => {
    eventsContainerElement.removeChild(componentEditElement);
    componentEdit.unrender();
  });
});

