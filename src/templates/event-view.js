const createTimetableTemplate = (event) => (
  `<p class="trip-point__schedule">
    <span class="trip-point__timetable">${event.get(`timetable`).start}&nbsp;&mdash; ${event.get(`timetable`).end}</span>
    <span class="trip-point__duration">${event.get(`timetable`).duration}h 00m</span>
  </p>`
);

const createOffersTemplate = (offers) => (
  `<ul class="trip-point__offers">
    ${offers
      .map((offer) => (offer.accepted) ?
        `<li>
          <button class="trip-point__offer">${offer.title} +&euro;&nbsp;${offer.price}</button>
        </li>` : ``
      ).join(``)}
  </ul>`
);


const createEventTemplate = (event) => {
  return `<article class="trip-point">
      <i class="trip-icon">${event.get(`type`)}</i>
      <h3 class="trip-point__title">${event.get(`city`)}</h3>
      ${createTimetableTemplate(event)}
      <p class="trip-point__price">&euro;&nbsp;${event.get(`price`)}</p>
      ${createOffersTemplate(event.get(`offers`))}
    </article>`
};

export default createEventTemplate;
