const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
// const descriptionInput = uploadForm.querySelector('.text__description');

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

const validateUploadForm = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {validateUploadForm};
