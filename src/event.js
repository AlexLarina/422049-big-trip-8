import {createElement} from './create-element';

class Event {
  constructor(data) {
    this._type = data.type;
    this._city = data.city;
    this._url = data.url;
    this._offers = data.offers;
    this._description = data.description;
    this._date = data.date;
    this._timetable = data.timetable;
    this._price = data.price;

    this._element = null;
    this._state = {
      isEdit: false
    };
  }

  get template() {
    return `
    <article class="trip-point">
        <i class="trip-icon">${this._type}</i>
        <h3 class="trip-point__title">${this._city}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${this._timetable.start}&nbsp;&mdash; ${this._timetable.end}</span>
          <span class="trip-point__duration">${this._timetable.duration}h 00m</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
        <ul class="trip-point__offers">
          ${this._offers
            .map((offer) => (
              `<li>
                <button class="trip-point__offer">${offer} +&euro;&nbsp;20</button>
              </li>`
            ))
          .join(``)}
      </ul>
    </article>
    `.trim();
  }

  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }

    this._element = createElement(this.template);
    container.appendChild(this._element);
  }
}


