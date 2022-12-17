import {renderPictures} from './pictures-mini.js';
import './upload-picture.js';
import {getData} from './client-api.js';
import {showErrorAlert} from './utils.js';

getData((pictures) => {
  renderPictures(pictures);
},
() => {
  showErrorAlert('Не удалось загрузить данные. Проверьте подключение к Интернету и перезагрузите страницу.');
});
