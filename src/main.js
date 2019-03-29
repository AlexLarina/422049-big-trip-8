import 'flatpickr/dist/flatpickr.min.css';

import EventViewComponent from './components/event-view';
import EventEditComponent from './components/event-edit';
import TripDayComponent from './components/trip-day';
import FiltersComponent from './components/filters-component';
import StatsComponent from './components/statistics';

import {createFilters} from './mocks/filters';
import {createEvents} from './mocks/events';
import {createDays} from './mocks/days';


const EVENTS_LIMIT = 2;
const DAYS_LIMIT = 7;
const STAT_ITEM_NAMES = [`money`, `transport`, `time-spend`];

const filters = createFilters();
const days = createDays(DAYS_LIMIT);

const navElement = document.querySelector(`.trip-controls__menus`);
const navStatsElement = document.querySelector(`.trip-controls__menus a:nth-child(2)`);
const tripPointsContainerElement = document.querySelector(`.trip-points`);

const mainElement = document.querySelector(`.main`);

// STATS

const stats = new StatsComponent(STAT_ITEM_NAMES);
const statsElement = stats.render();

const handleStatsClick = (evt) => {
  evt.preventDefault();

  mainElement.classList.toggle(`visually-hidden`);
  statsElement.classList.toggle(`visually-hidden`);

  navStatsElement.classList.add(`view-switch__item--active`);
};

navStatsElement.addEventListener(`click`, handleStatsClick);

document.body.appendChild(statsElement);

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

const filtersComponent = new FiltersComponent(filters);

filtersComponent.onChange = (filterId) => {
  console.log(`был выбран фильтр ` + filterId);
  let filteredDays = filtersComponent.onFiltate(filterId, days);
  removeAllChildNodes(tripPointsContainerElement);
  renderDays(filteredDays);
};

navElement.appendChild(filtersComponent.render());
