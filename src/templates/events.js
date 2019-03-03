// @TODO проблемы с вычисление промежутка времени
const createTimetable = (event) => (
  `<p class="trip-point__schedule">
    <span class="trip-point__timetable">${event.timetable.start}&nbsp;&mdash; ${event.timetable.end}</span>
    <span class="trip-point__duration"${(event.timetable.end - event.timetable.start)}h 00m</span>
  </p>`
);

const createOffers = (offers) => (
  `<ul class="trip-point__offers">
    ${offers
      .map((offer) => (
        `<li>
          <button class="trip-point__offer">${offer} +&euro;&nbsp;20</button>
      </li>`
      ))
    .join(``)}
  </ul>`
);

export const createEventsTemplate = (events, offers) => (
  events
  .map((event, index) => (
    `<article class="trip-point">
      <i class="trip-icon">${event.icon}</i>
      <h3 class="trip-point__title">${event.title}</h3>
      ${createTimetable(event)}
      <p class="trip-point__price">&euro;&nbsp;${event.price}</p>
      ${createOffers(offers[index])}
    </article>`
  ))
  .join(``)
);
