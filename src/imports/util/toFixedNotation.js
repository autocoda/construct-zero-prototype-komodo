export const toFixedNotation = (value, modifier = 1000, operation = 'multiply') => {

  if (typeof value !== "number" || typeof modifier !== "number") {
    return '--';
  }

  let totals;
  if (operation === 'multiply') {
    totals = value * modifier
  } else if (operation === 'division') {
    totals = value / modifier
  }

  if (totals <= 0.1) {
    return value.toFixed(6)
  } else if (totals <= 1) {
    return value.toFixed(4)
  } else if (totals <= 10) {
    return value.toFixed(3)
  } else if (totals <= 100) {
    return value.toFixed(2)
  } else {
    return value.toFixed(1)
  }
};