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

const updateEffect = (effectName, sliderMin = 0, sliderMax = 1, sliderStep = 0.1, filterName = effectName, unit = '') => {
  picture.classList.add(`effects__preview--${effectName}`);
  slider.noUiSlider.updateOptions({
    start: sliderMax,
    range: {
      min: sliderMin,
      max: sliderMax
    },
    step: sliderStep,
  });
  slider.noUiSlider.on('update', () => {
    picture.style.filter = `${filterName}(${effectLevel.value}${unit})`;
  });
};

const onEffectClick = (evt) => {
  picture.classList.remove(picture.classList[1]);
  slider.classList.remove('hidden');
  if (evt.target.closest('#effect-none')) {
    resetEffects();
  } else if (evt.target.closest('#effect-chrome')) {
    updateEffect('chrome', 0, 1, 0.1, 'grayscale');
  } else if (evt.target.closest('#effect-sepia')) {
    updateEffect('sepia');
  } else if (evt.target.closest('#effect-marvin')) {
    updateEffect('marvin', 0, 100, 1, 'invert', '%');
  } else if (evt.target.closest('#effect-phobos')) {
    updateEffect('phobos', 0, 3, 0.1, 'blur', 'px');
  } else if (evt.target.closest('#effect-heat')) {
    updateEffect('heat', 1, 3, 0.1, 'brightness');
  }
};

const addEffectsListener = () => {
  effectsContainer.addEventListener('click', onEffectClick);
};
const removeEffectsListener = () => {
  effectsContainer.removeEventListener('click', onEffectClick);
};

function resetEffects () {
  slider.classList.add('hidden');
  picture.removeAttribute('style');
  picture.classList.remove(picture.classList[1]);
}

export {createSlider, addEffectsListener, removeEffectsListener, resetEffects};
