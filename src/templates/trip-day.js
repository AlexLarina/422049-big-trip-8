export const createTripDayTemplate = (dayNumber, date) => (
  `<section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">${dayNumber}</p>
        <h2 class="trip-day__title">${date}</h2>
      </article>

      <div class="trip-day__items">
      </div>
    </section>`
);
