import {getRandomPhotos} from './data.js';
const photos = getRandomPhotos();

import {showBigPicture} from './picture-full.js';

const pictureContainer = document.querySelector('.pictures');
const photosListFragment = document.createDocumentFragment();

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fillPicture = function (photo) {
  const {url, likes, comments} = photo;

  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  picture.addEventListener('click', () => {
    showBigPicture(photo);
  });

  photosListFragment.append(picture);
};

const renderPictures = () => {
  photos.forEach((photo) => fillPicture(photo));
  pictureContainer.append(photosListFragment);
};

export {renderPictures};

