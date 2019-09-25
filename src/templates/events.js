const createTimetableTemplate = (event) => {

  console.log(event)
  return `<p class="trip-point__schedule">
    <span class="trip-point__timetable">${event.timetable.start}&nbsp;&mdash; ${event.timetable.end}</span>
    <span class="trip-point__duration">${event.timetable.duration}h 00m</span>
  </p>`
};

const createOffersTemplate = (offers) => (
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

const createEventTemplate = (event) => (
  `<article class="trip-point">
      <i class="trip-icon">${event.icon}</i>
      <h3 class="trip-point__title">${event.title}</h3>
      ${createTimetableTemplate(event)}
      <p class="trip-point__price">&euro;&nbsp;${event.price}</p>
      ${createOffersTemplate(event.offers)}
    </article>`
);

export default createEventTemplate;
