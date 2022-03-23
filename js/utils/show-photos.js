import {photoDataBase} from './database.js';

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
};

photoDataBase.forEach((photo) => {
  createNewCard(photo);
});

photosBlock.append(newPhotosFragment);
