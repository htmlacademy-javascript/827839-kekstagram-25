const getRandomInt = (a, b) => {
  if (a < 0 || b < 0) {
    return 'error! Number can\'t be negative';
  }
  if (a > b) {
    return Math.round(Math.random() * (a - b) + b);
  }
  return Math.round(Math.random() * (b - a) + a);
};

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const isStringLengthAllow = (someString, maxLength) => someString.length <= maxLength;

export {getRandomInt, getRandomArrayElement, isStringLengthAllow};
