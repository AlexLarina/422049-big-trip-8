import {capitalize} from '../lib/filterate';

const NAMES = [`everything`, `future`, `past`];

export const createFilters = () => {
  const filters = NAMES.map((name) => ({
    name,
    isSelected: false,
    description: capitalize(name)
  }));

  filters[0].isSelected = true;

  return filters;
};
