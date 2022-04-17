import {createSlider} from './utils/effects.js';
import {getPhotos} from './utils/server.js';
import {showError, showPhotos} from './utils/show-photos.js';
import {setUploadButtonClick} from './utils/upload-new-foto.js';
import {setUploadFormSubmit} from './utils/upload-form.js';

// showPhotos(photoDataBase);
getPhotos(showPhotos, showError);

setUploadButtonClick();
createSlider();
setUploadFormSubmit();
