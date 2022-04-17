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

  function loadComments () {
    const commentsFragment = document.createDocumentFragment();
    for (let i = bigPictureComments.children.length; i < bigPictureComments.children.length + INSTANT_COMMENTS_COUNT && i < currentPhoto.comments.length; i++) {
      const newComment = document.createElement('li');
      newComment.classList.add('social__comment');
      const newCommentAvatar = document.createElement('img');
      newCommentAvatar.classList.add('social__picture');
      newCommentAvatar.src = currentPhoto.comments[i].avatar;
      newCommentAvatar.alt = currentPhoto.comments[i].name;
      newCommentAvatar.width = 35;
      newCommentAvatar.height = 35;
      newComment.appendChild(newCommentAvatar);
      const newCommentText = document.createElement('p');
      newCommentText.classList.add('social__text');
      newCommentText.textContent = currentPhoto.comments[i].message;
      newComment.appendChild(newCommentText);
      commentsFragment.appendChild(newComment);
    }
    bigPictureComments.appendChild(commentsFragment);
    if (bigPictureComments.children.length === currentPhoto.comments.length) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
    bigPictureCommentsCurrentCount.textContent = bigPictureComments.children.length;
  }
  loadComments();
  bigPictureCommentsLoader.addEventListener('click', loadComments);

  const closeFullPhotoModal = () => {
    closeModal(bigPicture);
    bigPictureCommentsLoader.removeEventListener('click', loadComments);
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

