export const toFixedNotation = (value, modifier = 1000) => {

  if (typeof value !== "number") {
    return '--';
  }
  let tonnesTotalToKg = value * modifier

  if (tonnesTotalToKg <= 0.1 ) {
    return value.toFixed(6)
  } else if (tonnesTotalToKg <= 1 ) {
    return value.toFixed(4)
  } else if (tonnesTotalToKg <= 10) {
    return value.toFixed(3)
  } else if (tonnesTotalToKg <= 100) {
    return value.toFixed(2)
  } else {
    return value.toFixed(1)
  }
};