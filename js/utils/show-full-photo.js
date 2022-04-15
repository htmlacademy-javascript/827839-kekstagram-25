import {photoDataBase} from './database.js';
import {openModal, closeModal} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureExit = bigPicture.querySelector('.big-picture__cancel');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureCommentsCountBlock = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoadBlock = bigPicture.querySelector('.comments-loader');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const showFullPhoto = (index) => {
  openModal(bigPicture);

  bigPictureCommentsCountBlock.classList.add('hidden');//удалить позже
  bigPictureCommentsLoadBlock.classList.add('hidden');//удалить позже

  // const photoImg = photoElement.querySelector('.picture__img');
  bigPictureImg.src = photoDataBase[index].url;

  // const currentPhoto = photoDataBase.find((photo) => photoImg.src.includes(photo.url));
  const currentPhoto = photoDataBase[index];

  bigPictureCommentsCount.textContent = currentPhoto.comments.length;
  bigPictureLikes.textContent = currentPhoto.likes;
  bigPictureDescription.textContent = currentPhoto.description;

  for (let i = bigPictureComments.children.length - 1; i >= 0; i--) {
    bigPictureComments.children[i].remove();
  }

  const commentsFragment = document.createDocumentFragment();
  currentPhoto.comments.forEach((comment) => {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');
    const newCommentAvatar = document.createElement('img');
    newCommentAvatar.classList.add('social__picture');
    newCommentAvatar.src = comment.avatar;
    newCommentAvatar.alt = comment.name;
    newCommentAvatar.width = 35;
    newCommentAvatar.height = 35;
    newComment.appendChild(newCommentAvatar);
    const newCommentText = document.createElement('p');
    newCommentText.classList.add('social__text');
    newCommentText.textContent = comment.message;
    newComment.appendChild(newCommentText);
    commentsFragment.appendChild(newComment);
  });
  bigPictureComments.appendChild(commentsFragment);

  bigPictureExit.onclick = () => closeModal(bigPicture);
  document.onkeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeModal(bigPicture);
    }
  };
  document.onclick = (evt) => {
    if (evt.target.classList.contains('overlay') || evt.target.classList.contains('big-picture__preview')) {
      closeModal(bigPicture);
    }
  };
};

export {showFullPhoto};
