import {createSlider} from './utils/effects.js';
import {getPhotos} from './utils/server.js';
import {showError, showPhotos} from './utils/show-photos.js';
import {setUploadButtonClick} from './utils/upload-new-foto.js';
import {setUploadFormSubmit} from './utils/upload-form.js';

// showPhotos(photoDataBase);
getPhotos((photos) => {
  showPhotos(photos);
  // console.log(photos);
}, showError);

setUploadButtonClick();
createSlider();
setUploadFormSubmit();
