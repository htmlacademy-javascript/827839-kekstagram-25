import {getPhotos} from './utils/server.js';
import {showError, showPhotos} from './utils/show-photos.js';
import {setPhotoListFilter} from './utils/photo-list-filter.js';
import {setUploadButtonClick} from './utils/upload-new-foto.js';
import {setUploadFormSubmit} from './utils/upload-form.js';
import {createSlider} from './utils/effects.js';

getPhotos((photos) => {
  showPhotos(photos);
  setPhotoListFilter(photos);
}, showError);

setUploadButtonClick();
setUploadFormSubmit();
createSlider();
