const names = [`everything`, `future`, `past`];
const states = [`checked`, ``, ``]; // @TODO

export const createFilters = () => names.map((name) => ({
  name,
  state: ``
}));
