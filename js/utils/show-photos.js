import {showFullPhoto} from './show-full-photo.js';

const ALERT_SHOW_TIME = 4000;

const photoTemplate = document.querySelector('#picture').content;
const photosBlock = document.querySelector('.pictures');
const newPhotosFragment = document.createDocumentFragment();

const createNewCard = (photo) => {
  const newCard = photoTemplate.cloneNode(true);
  const newCardPicture = newCard.querySelector('.picture__img');
  newCardPicture.src = photo.url;
  const newCardLikes = newCard.querySelector('.picture__likes');
  newCardLikes.textContent = photo.likes;
  const newCardComments = newCard.querySelector('.picture__comments');
  newCardComments.textContent = photo.comments.length;
  newPhotosFragment.appendChild(newCard);
  return newCard;
};

const showPhotos = (data) => {
  data.forEach((photo) => {
    createNewCard(photo);
  });
  photosBlock.append(newPhotosFragment);
  const pictures = photosBlock.querySelectorAll('.picture');
  pictures.forEach((picture, index) => {
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      showFullPhoto(index);
    });
  });
};
const showError = () => {
  const errorElement = document.createElement('div');
  errorElement.textContent = 'Не удалось получить данные';
  errorElement.style.position = 'absolute';
  errorElement.style.width = '80%';
  errorElement.style.top = '45%';
  errorElement.style.left = '10%';
  errorElement.style.padding = '20px';
  errorElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
  errorElement.style.border = '10px black solid';
  errorElement.style.borderRadius = '25px';
  errorElement.style.fontSize = '25px';
  errorElement.style.fontWeight = 'bold';
  errorElement.style.textAlign = 'center';
  photosBlock.append(errorElement);

  setTimeout(() => errorElement.remove(), ALERT_SHOW_TIME);
};

export {showPhotos, showError};
