import {openModal, closeModal, isEscKey, isOversideClick} from './utils.js';

const INSTANT_COMMENTS_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureExit = bigPicture.querySelector('.big-picture__cancel');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentsTotalCount = bigPicture.querySelector('.comments-count');
const bigPictureCommentsCurrentCount = bigPicture.querySelector('.current-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureDescription = bigPicture.querySelector('.social__caption');


const createNewComment = (photo, index, fragment) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  const newCommentAvatar = document.createElement('img');
  newCommentAvatar.classList.add('social__picture');
  newCommentAvatar.src = photo.comments[index].avatar;
  newCommentAvatar.alt = photo.comments[index].name;
  newCommentAvatar.width = 35;
  newCommentAvatar.height = 35;
  newComment.appendChild(newCommentAvatar);
  const newCommentText = document.createElement('p');
  newCommentText.classList.add('social__text');
  newCommentText.textContent = photo.comments[index].message;
  newComment.appendChild(newCommentText);
  fragment.appendChild(newComment);
};

const showFullPhoto = (data, index) => {
  openModal(bigPicture);
  const currentPhoto = data[index];
  bigPictureImg.src = currentPhoto.url;
  bigPictureDescription.textContent = currentPhoto.description;
  bigPictureLikes.textContent = currentPhoto.likes;
  bigPictureCommentsTotalCount.textContent = currentPhoto.comments.length;
  bigPictureCommentsLoader.classList.remove('hidden');

  for (let i = bigPictureComments.children.length - 1; i >= 0; i--) {
    bigPictureComments.children[i].remove();
  }

  const loadComments = () => {
    const commentsFragment = document.createDocumentFragment();
    const newCommentsCount = Math.min(bigPictureComments.children.length + INSTANT_COMMENTS_COUNT, currentPhoto.comments.length);
    for (let i = bigPictureComments.children.length; i < newCommentsCount; i++) {
      createNewComment(currentPhoto, i, commentsFragment);
    }
    bigPictureComments.appendChild(commentsFragment);
    if (newCommentsCount === currentPhoto.comments.length) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
    bigPictureCommentsCurrentCount.textContent = newCommentsCount;
  };

  loadComments();
  const onCommentsLoaderClick = () => loadComments();
  bigPictureCommentsLoader.addEventListener('click', onCommentsLoaderClick);

  const closeFullPhotoModal = () => {
    closeModal(bigPicture);
    bigPictureCommentsLoader.removeEventListener('click', onCommentsLoaderClick);
    removeHideFullPhotoHandlers();
  };
  const onFullPhotoEscKeydown = (evt) => {
    if (isEscKey(evt)) {
      closeFullPhotoModal();
    }
  };
  const onFullPhotoOversideClick = (evt) => {
    if (isOversideClick(evt)) {
      closeFullPhotoModal();
    }
  };
  bigPictureExit.addEventListener('click', closeFullPhotoModal);
  document.addEventListener('keydown', onFullPhotoEscKeydown);
  document.addEventListener('click', onFullPhotoOversideClick);

  function removeHideFullPhotoHandlers () {
    bigPictureExit.removeEventListener('click', closeFullPhotoModal);
    document.removeEventListener('keydown', onFullPhotoEscKeydown);
    document.removeEventListener('click', onFullPhotoOversideClick);
  }
};

export {showFullPhoto};

