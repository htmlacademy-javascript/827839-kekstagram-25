import {addEffectsListener, removeEffectsListener, resetEffects} from './effects.js';
import {addScaleListeners, removeScaleListeners} from './scale-control.js';
import {openModal, closeModal, isEscKey, isOversideClick} from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadModal =uploadForm.querySelector('.img-upload__overlay');
const uploadModalExit = uploadForm.querySelector('#upload-cancel');
const previewImg = uploadForm.querySelector('img');
const fileInput = uploadForm.querySelector('#upload-file');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const showUploadPreview = () => {
  const file = fileInput.files[0];
  previewImg.src = URL.createObjectURL(file);
};

const closeUploadModal = () => {
  closeModal(uploadModal);
  removeHideUploadModalHandlers();
  removeToggleListeningKeydownEvent();
  removeScaleListeners();
  removeEffectsListener();
  uploadForm.reset();
  resetEffects();
};

const onUploadExitButton = () => closeUploadModal();
const onEscUploadModalKeydown = (evt) => {
  if (isEscKey(evt)) {
    closeUploadModal();
  }
};
const onOversideUploadModalClick = (evt) => {
  if (isOversideClick(evt)) {
    closeUploadModal();
  }
};

const addHideUploadModalHandlers = () => {
  uploadModalExit.addEventListener('click', onUploadExitButton);
  document.addEventListener('keydown', onEscUploadModalKeydown);
  document.addEventListener('click', onOversideUploadModalClick);
};

function removeHideUploadModalHandlers () {
  uploadModalExit.removeEventListener('click', onUploadExitButton);
  document.removeEventListener('keydown', onEscUploadModalKeydown);
  document.removeEventListener('click', onOversideUploadModalClick);
}
const removeEscUploadModalHandler = () => {
  document.removeEventListener('keydown', onEscUploadModalKeydown);
};

const addEscUploadModalHandler = () => {
  document.addEventListener('keydown', onEscUploadModalKeydown);
};

const toggleListeningKeydownEvent = () => {
  hashtagInput.addEventListener('focus', removeEscUploadModalHandler);
  descriptionInput.addEventListener('focus', removeEscUploadModalHandler);
  hashtagInput.addEventListener('blur', addEscUploadModalHandler);
  descriptionInput.addEventListener('blur', addEscUploadModalHandler);
};

function removeToggleListeningKeydownEvent () {
  hashtagInput.removeEventListener('focus', removeEscUploadModalHandler);
  descriptionInput.removeEventListener('focus', removeEscUploadModalHandler);
  hashtagInput.removeEventListener('blur', addEscUploadModalHandler);
  descriptionInput.removeEventListener('blur', addEscUploadModalHandler);
}

const setUploadButtonClick = () => {
  fileInput.addEventListener('change', () => {
    openModal(uploadModal);
    showUploadPreview();
    addHideUploadModalHandlers();
    toggleListeningKeydownEvent();
    addScaleListeners();
    addEffectsListener();
  });
};

export {setUploadButtonClick, closeUploadModal};
