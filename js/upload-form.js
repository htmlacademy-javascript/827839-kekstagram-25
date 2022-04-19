import {sendNewPhoto} from './server.js';
import {closeUploadModal} from './upload-new-foto.js';
import {isEscKey, isOversideMessageClick} from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

const showMessage = (result) => {
  const messageTemplate = document.querySelector(`#${result}`).content;
  const message = messageTemplate.cloneNode(true);
  const messageButton = message.querySelector(`.${result}__button`);
  document.body.appendChild(message);

  const onEscMessageKeydown = (evt) => {
    if (isEscKey(evt)) {
      removeMessage();
    }
  };
  const onOversideMessageClick = (evt) => {
    if (isOversideMessageClick(evt)) {
      removeMessage();
    }
  };
  messageButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onEscMessageKeydown);
  document.addEventListener('click', onOversideMessageClick);

  function removeMessage () {
    const messageElement = document.querySelector(`.${result}`);
    messageElement.remove();
    messageButton.removeEventListener('click', removeMessage);
    document.removeEventListener('keydown', onEscMessageKeydown);
    document.removeEventListener('click', onOversideMessageClick);
  }
};

const pristine = new Pristine(uploadForm, {
  classTo: 'text__field-wrapper',
  errorTextParent: 'text__field-wrapper',
  errorTextClass: 'text__error'
});

const hashtagPattern = /^#/;
let hashtagError = 'увы';
const getHashtagError = () => hashtagError;

const validateHashtag = () => {
  if (hashtagInput.value === '') {
    return true;
  }

  const hashtags = hashtagInput.value.split(' ');
  if (hashtags.length > 5) {
    hashtagError =  'Не больше 5 хэштегов';
    return false;
  }

  const uniqueHashtags = new Set();
  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtagPattern.test(hashtags[i])) {
      hashtagError = `${i + 1}-й хэштег должен начинаться с #`;
      return false;
    }
    if (hashtags[i] === '#') {
      hashtagError = `${i + 1}-й не может состоять только из одной #`;
      return false;
    }
    if (hashtags[i].length > 20) {
      hashtagError = `${i + 1}-й хэштег должен быть не длиннее 20 символов, включая #`;
      return false;
    }
    uniqueHashtags.add(hashtags[i].toLowerCase());
  }

  if (uniqueHashtags.size < hashtags.length) {
    hashtagError = 'Один и тот же хэштег не может быть использован дважды';
    return false;
  }

  return true;
};

pristine.addValidator(hashtagInput, validateHashtag, getHashtagError);

const setUploadFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendNewPhoto(
        () => {
          closeUploadModal();
          showMessage('success');
        },
        () => showMessage('error'),
        new FormData(uploadForm)
      );
    }
  });
};

export {setUploadFormSubmit};
