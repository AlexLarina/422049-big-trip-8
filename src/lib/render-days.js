import EventViewComponent from '../components/event-view';
import EventEditComponent from '../components/event-edit';
import TripDayComponent from '../components/trip-day';
import {createEvents} from '../mocks/events';

const renderDays = (daysData, container) => {
  daysData.forEach((day, index) => {
    const tripDay = new TripDayComponent(index + 1, day[0].get(`date`));
    const tripDayElement = tripDay.render();
    container.appendChild(tripDayElement);

    tripDay.onClick(() => {
      // @TODO
    });

    const eventsContainerElement = tripDayElement.querySelector(`.trip-day__items`);

    // let events = createEvents(limit);

    day.forEach((event) => {
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

export default renderDays;
