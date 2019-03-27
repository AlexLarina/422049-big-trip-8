export const createTripDayTemplate = (day) => (
  `<section class="trip-day">
      <article class="trip-day__info">
        <span class="trip-day__caption">Day</span>
        <p class="trip-day__number">${day[`day_number`]}</p>
        <h2 class="trip-day__title">${day.date}</h2>
      </article>

      <div class="trip-day__items">
      </div>
    </section>`
);
