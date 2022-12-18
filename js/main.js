import {initialRenderPictures} from './pictures-mini.js';
import './upload-picture.js';
import './input-file.js';
import {getData} from './client-api.js';
import {showErrorAlert} from './utils.js';

getData((pictures) => {
  initialRenderPictures(pictures);
},
() => {
  showErrorAlert('Не удалось загрузить данные. Проверьте подключение к Интернету и перезагрузите страницу.');
});
