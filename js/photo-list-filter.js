import {showPhotos} from './show-photos.js';
import {debounce, getRandomInt} from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;

const filtersBlock = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const clearPhotoList = () => {
  const pictures = document.querySelectorAll('.picture');
  for (let i = pictures.length - 1; i >= 0; i--) {
    pictures[i].remove();
  }
};

const setPhotoListFilter = (photos) => {
  filtersBlock.classList.remove('img-filters--inactive');

  filterDefaultButton.addEventListener('click', debounce(
    () => {
      filterDefaultButton.classList.add('img-filters__button--active');
      filterRandomButton.classList.remove('img-filters__button--active');
      filterDiscussedButton.classList.remove('img-filters__button--active');
    },
    () => {
      clearPhotoList();
      showPhotos(photos);
    })
  );

  filterRandomButton.addEventListener('click', debounce(
    () => {
      filterDefaultButton.classList.remove('img-filters__button--active');
      filterRandomButton.classList.add('img-filters__button--active');
      filterDiscussedButton.classList.remove('img-filters__button--active');
    },
    () => {
      const randomIndeces = [];
      while (randomIndeces.length < RANDOM_PHOTOS_COUNT) {
        const newIndex = getRandomInt(0, photos.length - 1);
        if (!randomIndeces.includes(newIndex)) {
          randomIndeces.push(newIndex);
          randomIndeces.sort((a, b) => a - b);
        }
      }
      const filteredPhotos = randomIndeces.map((index) => photos[index]);

      clearPhotoList();
      showPhotos(filteredPhotos);
    })
  );

  filterDiscussedButton.addEventListener('click', debounce(
    () => {
      filterDefaultButton.classList.remove('img-filters__button--active');
      filterRandomButton.classList.remove('img-filters__button--active');
      filterDiscussedButton.classList.add('img-filters__button--active');
    },
    () => {
      const filteredPhotos= photos.slice().sort((a,b) => b.comments.length - a.comments.length);
      clearPhotoList();
      showPhotos(filteredPhotos);
    })
  );
};

export {setPhotoListFilter};
