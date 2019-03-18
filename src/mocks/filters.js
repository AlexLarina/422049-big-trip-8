import {createRandomNumber} from '../../public/lib/random';

const NAMES = [`everything`, `future`, `past`];

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const createFilters = () => {
  const filters = NAMES.map((name) => ({
    name,
    isSelected: false,
    description: capitalize(name)
  }));

  filters[createRandomNumber(0, filters.length - 1)].isSelected = true;

  return filters;
};
