const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);


export const createFiltersTemplate = (filters) => (
  filters
  .map((filter) => (
    `<input
      type="radio"
      id="filter-${filter.name}"
      name="filter"
      value="${filter.name}"
      ${filter.state}
    >
    <label
      class="trip-filter__item"
      for="filter-${filter.name}"
    >
    ${capitalize(filter.name)}
    </label>`
  ))
  .join(``)
);

