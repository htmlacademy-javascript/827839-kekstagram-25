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
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
});

const hashtagPattern = /^#[a-zA-Zа-яА-ЯёË0-9]{1,19}(\s#[a-zA-Zа-яА-ЯёË0-9]{1,19}){0,4}$/;

const validateHashtag = () => hashtagPattern.test(hashtagInput.value) || hashtagInput.value === '';

// const validateDescription = () => {};

const getHashtagError = () => 'Неправильный хэштег :('; // реализую более гибкую валидацию позже

pristine.addValidator(hashtagInput, validateHashtag, getHashtagError);
// pristine.addValidator(descriptionInput, validateDescription, '');

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
