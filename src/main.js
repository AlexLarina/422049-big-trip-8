import 'flatpickr/dist/flatpickr.min.css';

import FiltersComponent from './components/filters-component';
import StatsComponent from './components/statistics';

import {createFilters} from './mocks/filters';

import {filterateDays} from './lib/filterate';
import {
  visibilityToggle,
  removeAllChildNodes,
  removeActiveToggle} from './lib/node';
import renderDays from './lib/render-days';
import API from './lib/api';

import ModelEvent from './models/event';

const AUTHORIZATION = `Basic eo0w590ik${Math.random() * 10000}a`;
const END_POINT = `https://es8-demo-srv.appspot.com/big-trip`;
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

const EVENTS_LIMIT = 2;
const STAT_ITEM_NAMES = [`money`, `transport`, `time-spend`];

const filters = createFilters();

const navElement = document.querySelector(`.trip-controls__menus`);
const navTableElement = document.querySelector(`.trip-controls__menus a:first-child`);
const navStatsElement = document.querySelector(`.trip-controls__menus a:nth-child(2)`);
const mainElement = document.querySelector(`.main`);
const tripPointsContainerElement = document.querySelector(`.trip-points`);


const stats = new StatsComponent(STAT_ITEM_NAMES);
const statsElement = stats.render();
document.body.appendChild(statsElement);

const handleStatsClick = (evt, target) => {
  evt.preventDefault();

  visibilityToggle(mainElement);
  visibilityToggle(statsElement);

  removeActiveToggle(navElement);
  target.classList.add(`view-switch__item--active`);
};

navStatsElement.addEventListener(`click`, (evt) => {
  handleStatsClick(evt, navStatsElement);
});

navTableElement.addEventListener(`click`, (evt) => {
  handleStatsClick(evt, navTableElement);
});

const filtersComponent = new FiltersComponent(filters);
navElement.appendChild(filtersComponent.render());
const navFiltersFormElement = document.querySelector(`form.trip-filter`);

filtersComponent.onChange = (filterId) => {
  navFiltersFormElement.querySelector(`#` + filterId).checked = true;
  let filteredDays = filterateDays(filterId, days);
  removeAllChildNodes(tripPointsContainerElement);
  renderDays(filteredDays, tripPointsContainerElement, EVENTS_LIMIT);
};

Promise
  .all([
    api.getEvents(),
    api.getDestinations(),
    api.getOffers()
  ])
  .then(([events, destinations, offers]) => {
    renderDays(events, tripPointsContainerElement, destinations);
  });
