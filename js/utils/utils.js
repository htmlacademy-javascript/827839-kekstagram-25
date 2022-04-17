const body = document.querySelector('body');

const openModal = (modal) => {
  modal.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeModal = (modal) => {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');
};

const isEscKey = (evt) => evt.key === 'Escape';
const isOversideClick = (evt) => evt.target.classList.contains('overlay') || evt.target.classList.contains('big-picture__preview') || evt.target.classList.contains('img-upload__overlay');
const isOversideMessageClick = (evt) => evt.target.classList.contains('error') || evt.target.classList.contains('success');

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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {openModal,closeModal, isEscKey, isOversideClick, isOversideMessageClick, getRandomInt, getRandomArrayElement, isStringLengthAllow, debounce};
