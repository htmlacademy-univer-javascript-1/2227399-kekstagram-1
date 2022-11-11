import {getRandomPhotos} from './data.js';
const photos = getRandomPhotos();

const pictureContainer = document.querySelector('.pictures');
const photosListFragment = document.createDocumentFragment();

const pictureTemplate = document.querySelector('#picture').content;
const newPictureTemplate = pictureTemplate.querySelector('.picture');

const createPictureFromPhoto = function (photo) {
  const {url, likes, comments} = photo;

  const picture = newPictureTemplate.cloneNode(true);
  picture.querySelector('img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  photosListFragment.append(picture);
};

photos.forEach((photo) => createPictureFromPhoto(photo));
pictureContainer.append(photosListFragment);
