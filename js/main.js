const getRandomInt = (a, b) => {
  if (a < 0 || b < 0) {
    return 'error! Number can\'t be negative';
  }
  if (a > b) {
    return Math.round(Math.random() * (a - b) + b);
  }
  return Math.round(Math.random() * (b - a) + a);
};

const isStringLengthAllow = (someString, maxLength) => someString.length <= maxLength;

getRandomInt(5);
isStringLengthAllow('qwert', 4);
