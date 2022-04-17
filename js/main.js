import {getPhotos} from './server.js';
import {showError, showPhotos} from './show-photos.js';
import {setPhotoListFilter} from './photo-list-filter.js';
import {setUploadButtonClick} from './upload-new-foto.js';
import {setUploadFormSubmit} from './upload-form.js';
import {createSlider} from './effects.js';

getPhotos((photos) => {
  showPhotos(photos);
  setPhotoListFilter(photos);
}, showError);

setUploadButtonClick();
setUploadFormSubmit();
createSlider();
