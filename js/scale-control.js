const scaleControl = document.querySelector('.scale');
const scaleInput = document.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview');

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;
let scaleValue = 100;

const resizePicture = () => {
  picture.style.transform = `scale(${scaleValue/100})`;
};

const onScaleControlClick = (evt) => {
  if (evt.target.matches('.scale__control--bigger')) {
    scaleValue += SCALE_STEP;
    scaleValue = Math.min(scaleValue, MAX_SCALE_VALUE);
  }
  if (evt.target.matches('.scale__control--smaller')) {
    scaleValue -= SCALE_STEP;
    scaleValue = Math.max(scaleValue, MIN_SCALE_VALUE);
  }
  scaleInput.value = `${scaleValue}%`;
  resizePicture();
};

const addScaleListeners = () => {
  scaleInput.value = '100%';
  scaleControl.addEventListener('click', onScaleControlClick);
};

const removeScaleListeners = () => {
  scaleControl.removeEventListener('click', onScaleControlClick);
};

export {addScaleListeners, removeScaleListeners};
