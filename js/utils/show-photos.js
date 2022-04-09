import {photoDataBase} from './database.js';
import {showFullPhoto} from './show-full-photo.js';

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

photoDataBase.forEach((photo) => {
  createNewCard(photo);
});

const showPhotos = () => {
  photosBlock.append(newPhotosFragment);
  const pictures = photosBlock.querySelectorAll('.picture');
  pictures.forEach((picture, index) => {
    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      showFullPhoto(index);
    });
  });
};


// photosBlock.onclick = (evt) => {
//   if (evt.target.nodeName === 'IMG') {
//     const currentPhoto = evt.target.parentNode;
//     evt.preventDefault();
//     showFullPhoto(currentPhoto);
//   }
// };

export {showPhotos};
