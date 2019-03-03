export const createFiltersTemplate = (filters) => (
  filters
    .map((filter) => (
      `<input
        type="radio"
        id="filter-${filter.name}"
        name="filter"
        value="${filter.name}"
        ${filter.isSelected ? `checked` : ``}
      >
      <label
        class="trip-filter__item"
        for="filter-${filter.name}"
      >
        ${filter.description}
      </label>`
    ))
    .join(``)
);

