import ModelEvent from './adapter';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 & response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  consoleView(customURL) {
    console.log(this._load({url: customURL})
    .then(toJSON));
  }

  getEvents() {
    return this._load({url: `points`})
      .then(toJSON)
      .then(ModelEvent.sortEventsByDate);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

};

export default API;
