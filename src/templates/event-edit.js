const createDateTemplate = () => (
  `<label class="point__date">
    choose day
    <input class="point__input" type="text" placeholder="MAR 18" name="day">
  </label>`
);

const createWayGroupTemplate = (event, groupType) => (
  event.get(groupType)()
    .map((type) => (
      `<input
        class="travel-way__select-input visually-hidden"
        type="radio"
        id="travel-way-${type.toLowerCase()}"
        name="travel-way" value="${type.toLowerCase()}"
      >
      <label class="travel-way__select-label" for="travel-way-${type.toLowerCase()}">
        ${event.get(`getTypes`)()[type]} ${type.toLowerCase()}
      </label>`
    ))
    .join(``)
);


const createTravelWayTemplate = (event) => (
  `<div class="travel-way">
  <label class="travel-way__label" for="travel-way__toggle">${event.get(`type`)}</label>

  <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

  <div class="travel-way__select">
    <div class="travel-way__select-group">
      ${createWayGroupTemplate(event, `getTransportTypes`)}
    </div>

    <div class="travel-way__select-group">
      ${createWayGroupTemplate(event, `getLocalTypes`)}
    </div>
  </div>
</div>`
);

const createDestinationTemplate = (event) => (
  `<div class="point__destination-wrap">
    <label class="point__destination-label" for="destination">Flight to</label>
    <input class="point__destination-input" list="destination-select" id="destination" value="${event.get(`city`)}" name="destination">
    <datalist id="destination-select">
      <option value="airport"></option>
      <option value="Geneva"></option>
      <option value="Chamonix"></option>
      <option value="hotel"></option>
    </datalist>
  </div>`
);

const createTimetableTemplate = (event) => (
  `<label class="point__time">
    choose time
    <input
      class="point__input"
      type="text" value="${event.get(`timetable`).start} — ${event.get(`timetable`).end}"
      name="time" placeholder="00:00 — 00:00"
    >
  </label>`
);

const createPriceTemplate = (event) => (
  `<label class="point__price">
    write price
    <span class="point__price-currency">€</span>
    <input class="point__input" type="text" value="${event.get(`price`)}" name="price">
  </label>`
);

const convertOfferName = (offer) => offer.split(` `).map((word) => word.toLowerCase()).join(`-`);

const createOffersTemplate = (event) => (
  `<section class="point__offers">
    <h3 class="point__details-title">offers</h3>
    <div class="point__offers-wrap">
    ${event.get(`offers`)
      .map((offer) => (
        `<input
          class="point__offers-input visually-hidden"
          type="checkbox"
          id="${convertOfferName(offer)}"
          name="offer"
          value="${convertOfferName(offer)}"
        >
        <label for="${convertOfferName(offer)}" class="point__offers-label">
          <span class="point__offer-service">${offer}</span> + €<span class="point__offer-price">30</span>
        </label>`
      ))
    .join(``)}
    </div>
  </section>`
);

const createDescriptionTemplate = (event) => (
  `<section class="point__destination">
    <h3 class="point__details-title">Destination</h3>
    <p class="point__destination-text">
      ${event.get(`description`)}
    </p>
    <div class="point__destination-images">
      <img src="${event.get(`url`)}" alt="picture from place" class="point__destination-image">
    </div>
  </section>`
);

const createHeaderTemplate = (event) => (
  `<header class="point__header">
      ${createDateTemplate()}
      ${createTravelWayTemplate(event)}
      ${createDestinationTemplate(event)}
      ${createTimetableTemplate(event)}
      ${createPriceTemplate(event)}

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
        <label class="point__favorite" for="favorite">favorite</label>
      </div>
    </header>`
);

const createDetailsTemplate = (event) => (
  `<section class="point__details">
    ${createOffersTemplate(event)}
    ${createDescriptionTemplate(event)}
    <input type="hidden" class="point__total-price" name="total-price" value="">
  </section>`
);

const createEventEditTemplate = (event) => (
  `<article class="point">
  <form action="" method="get">
    ${createHeaderTemplate(event)}
    ${createDetailsTemplate(event)}
  </form>
</article>`
);

export default createEventEditTemplate;
