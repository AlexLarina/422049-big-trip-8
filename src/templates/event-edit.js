const convertOfferName = (offerTitle) => offerTitle.split(` `).map((word) => word.toLowerCase()).join(`-`);

const createDateTemplate = () => (
  `<label class="point__date">
    choose day
    <input class="point__input" type="text" placeholder="MAR 18" name="day">
  </label>`
);

const createWayGroupTemplate = (event, iconTypes, iconGroup) => (
  event.get(iconGroup)
    .map((icon) => (
      `<input
        class="travel-way__select-input visually-hidden"
        type="radio"
        id="travel-way-${icon.toLowerCase()}"
        name="travel-way" value="${icon.toLowerCase()}"
      >
      <label class="travel-way__select-label" for="travel-way-${icon.toLowerCase()}">
      ${event.get(iconTypes)[icon]} ${icon.toLowerCase()}
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
      ${createWayGroupTemplate(event, `types`, `transportTypes`)}
    </div>

    <div class="travel-way__select-group">
      ${createWayGroupTemplate(event, `types`, `localTypes`)}
    </div>
  </div>
</div>`
);

const createDestinationTemplate = (event, destinations) => (
  `<div class="point__destination-wrap">
    <label class="point__destination-label" for="destination">Flight to</label>
    <input class="point__destination-input" list="destination-select" id="destination" value="${event.get(`city`)}" name="destination">
    <datalist id="destination-select">
      ${destinations
        .then((set) => {
          const cities = [];
          Array.from(set.values()).forEach((item) => {
            cities.push(`<option value="${item.name}"></option>`);
          });
          console.log(cities.join(``));
          return cities.join(``);
        })
  }
    </datalist>
  </div>`
);

const createTimetableTemplate = (event) => (
  `<div class="point__time">
    choose time
    <input class="point__input" type="text" value="${event.get(`timetable`).start}" name="date-start" placeholder="19:00">
    <input class="point__input" type="text" value="${event.get(`timetable`).end}" name="date-end" placeholder="21:00">
  </div>`
);

const createPriceTemplate = (event) => (
  `<label class="point__price">
    write price
    <span class="point__price-currency">€</span>
    <input class="point__input" type="text" value="${event.get(`price`)}" name="price">
  </label>`
);

const createOffersTemplate = (event) => (
  `<section class="point__offers">
    <h3 class="point__details-title">offers</h3>
    <div class="point__offers-wrap">
    ${event.get(`offers`)
      .map((offer) => (
        `<input
          class="point__offers-input visually-hidden"
          type="checkbox"
          id="${convertOfferName(offer.title)}"
          name="offer"
          value="${convertOfferName(offer.title)}"
          ${offer.accepted ? `checked` : ``}
        >
        <label for="${convertOfferName(offer.title)}" class="point__offers-label">
          <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
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
      ${(event.get(`pictures`)
      .map((picture) =>
        `<img src="${picture.src}" alt="${picture.description}" class="point__destination-image">`
      )).join(``)}
    </div>
  </section>`
);

const createHeaderTemplate = (event, destinations) => (
  `<header class="point__header">
      ${createDateTemplate()}
      ${createTravelWayTemplate(event)}
      ${createDestinationTemplate(event, destinations)}
      ${createTimetableTemplate(event)}
      ${createPriceTemplate(event)}

      <div class="point__buttons">
        <button class="point__button point__button--save" type="submit">Save</button>
        <button class="point__button" type="reset">Delete</button>
      </div>

      <div class="paint__favorite-wrap">
        <input
          type="checkbox"
          class="point__favorite-input visually-hidden"
          id="favorite"
          name="favorite"
          ${event.get(`isFavourite`) ? `checked` : ``}
        >
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

const createEventEditTemplate = (event, destinations) => (
  `<article class="point">
  <form action="" method="get">
    ${createHeaderTemplate(event, destinations)}
    ${createDetailsTemplate(event)}
  </form>
</article>`
);

export default createEventEditTemplate;
