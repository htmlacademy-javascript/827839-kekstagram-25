const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview');
let scaleValue = 100;

const resizePicture = () => {
  picture.style.transform = `scale(${scaleValue/100})`;
};

const onScaleDownButtonClick = () => {
  if (scaleValue >= 25) {
    scaleValue -= 25;
  } else {
    scaleValue = 0;
  }
  scaleInput.value = `${scaleValue}%`;
  resizePicture();
};
const onScaleUpButtonClick = () => {
  if (scaleValue <= 75) {
    scaleValue += 25;
  } else {
    scaleValue = 100;
  }
  scaleInput.value = `${scaleValue}%`;
  resizePicture();
};

const addScaleListeners = () => {
  scaleInput.value = '100%';
  scaleDownButton.addEventListener('click', onScaleDownButtonClick);
  scaleUpButton.addEventListener('click', onScaleUpButtonClick);
};

const removeScaleListeners = () => {
  scaleDownButton.removeEventListener('click', onScaleDownButtonClick);
  scaleUpButton.removeEventListener('click', onScaleUpButtonClick);
};

export {addScaleListeners, removeScaleListeners};
