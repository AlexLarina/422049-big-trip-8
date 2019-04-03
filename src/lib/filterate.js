const filterateDays = (attribute, daysData) => {
  let filteredDays;
  switch (attribute) {
    case `filter-everything`:
      filteredDays = daysData;
      filteredDays.map((it, index) => {
        it[`day_number`] = index + 1;
      });
      break;
    case `filter-future`:
      filteredDays = daysData
        .filter((it) => it[`date-timestamp`] > Date.now());

      filteredDays.map((it, index) => {
        it[`day_number`] = index + 1;
      });
      break;
    case `filter-past`:
      filteredDays = daysData
        .filter((it) => it[`date-timestamp`] < Date.now());
      filteredDays.map((it, index) => {
        it[`day_number`] = index + 1;
      });
      break;
  }

  return filteredDays;
};

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {filterateDays, capitalize};
