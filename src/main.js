import EventViewComponent from './components/event-view';
import EventEditComponent from './components/event-edit';
import TripDayComponent from './components/trip-day';

import {createFilters} from './mocks/filters';
import {createEvents} from './mocks/events';
import {createDays} from './mocks/days';

import {createFiltersTemplate} from './templates/filters';

const EVENTS_LIMIT = 2;
const DAYS_LIMIT = 2;

const filters = createFilters();
const days = createDays(DAYS_LIMIT);

const tripPointsContainer = document.querySelector(`.trip-points`);

const filtersContainerElement = document.querySelector(`.trip-filter`);
filtersContainerElement.innerHTML = createFiltersTemplate(filters);

days.forEach((day) => {
  const tripDay = new TripDayComponent(day);
  const tripDayElement = tripDay.render();
  tripPointsContainer.appendChild(tripDayElement);

  tripDay.onClick(() =>{
    console.log(`data clicked!`);
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
  });
});

