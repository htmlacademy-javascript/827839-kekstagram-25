const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const picture = document.querySelector('.img-upload__preview');
const effectsContainer = document.querySelector('.effects__list');

const createSlider = () => {
  noUiSlider.create(slider, {
    start: 100,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100
    }
  });
  slider.classList.add('hidden');
  slider.noUiSlider.on('update', () => {
    effectLevel.value = slider.noUiSlider.get();
  });
};

const onEffectClick = (evt) => {
  picture.classList.remove(picture.classList[1]);
  slider.classList.remove('hidden');
  if (evt.target.closest('#effect-none')) {
    slider.classList.add('hidden');
    picture.removeAttribute('style');
  } else if (evt.target.closest('#effect-chrome')) {
    picture.classList.add('effects__preview--chrome');
    slider.noUiSlider.updateOptions({
      start: 1,
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
    });
    slider.noUiSlider.on('update', () => {
      picture.style.filter = `grayscale(${effectLevel.value})`;
    });
  } else if (evt.target.closest('#effect-sepia')) {
    picture.classList.add('effects__preview--sepia');
    slider.noUiSlider.updateOptions({
      start: 1,
      range: {
        min: 0,
        max: 1
      },
      step: 0.1,
    });
    slider.noUiSlider.on('update', () => {
      picture.style.filter = `sepia(${effectLevel.value})`;
    });
  } else if (evt.target.closest('#effect-marvin')) {
    picture.classList.add('effects__preview--marvin');
    slider.noUiSlider.updateOptions({
      start: 100,
      range: {
        min: 0,
        max: 100
      },
      step: 1,
    });
    slider.noUiSlider.on('update', () => {
      picture.style.filter = `invert(${effectLevel.value}%)`;
    });
  } else if (evt.target.closest('#effect-phobos')) {
    picture.classList.add('effects__preview--phobos');
    slider.noUiSlider.updateOptions({
      start: 3,
      range: {
        min: 0,
        max: 3
      },
      step: 0.1,
    });
    slider.noUiSlider.on('update', () => {
      picture.style.filter = `blur(${effectLevel.value}px)`;
    });
  } else if (evt.target.closest('#effect-heat')) {
    picture.classList.add('effects__preview--heat');
    slider.noUiSlider.updateOptions({
      start: 3,
      range: {
        min: 1,
        max: 3
      },
      step: 0.1,
    });
    slider.noUiSlider.on('update', () => {
      picture.style.filter = `brightness(${effectLevel.value})`;
    });
  }
};
const addEffectsListener = () => {
  effectsContainer.addEventListener('click', onEffectClick);
};
const removeEffectsListener = () => {
  effectsContainer.removeEventListener('click', onEffectClick);
};

export {createSlider, addEffectsListener, removeEffectsListener};
