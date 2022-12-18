import {showBigPicture} from './picture-full.js';
import {shuffle} from './utils.js';

// constants
const DEBOUNCE_DELAY = 500;
const NUMBER_OF_PICTURES_FOR_RANDOM_FILTER = 10;

// pictures query selectors
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const photosListFragment = document.createDocumentFragment();

// filters query selectors
const filters = document.querySelector('.img-filters');
const filtersGroup = document.querySelector('.img-filters__form');

// filter buttons query selectors
const buttonFilterDefault = document.querySelector('#filter-default');
const buttonFilterRandom = document.querySelector('#filter-random');
const buttonFilterDiscussed = document.querySelector('#filter-discussed');

//filters
const FILTERS = {
  'filter-default': buttonFilterDefault,
  'filter-random': buttonFilterRandom,
  'filter-discussed': buttonFilterDiscussed,
};

//functions

let newPictures, currentPictures = [];

const fillPicture = function (photo) {
  const {id, url, likes, comments} = photo;

  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  picture.dataset.id = id;

  photosListFragment.append(picture);
  currentPictures.push(picture);
};

const renderPictures = () => {
  currentPictures.forEach((photo) => pictureContainer.removeChild(photo));
  currentPictures = [];

  newPictures.forEach((photo) => fillPicture(photo));
  pictureContainer.appendChild(photosListFragment);

  pictureContainer.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
      const clickedPicture = newPictures.find(({id}) => Number(pictureElement.dataset.id) === id);
      showBigPicture(clickedPicture);
    }
  });
};

const changeFilter = (pictures) => {
  let currentFilter = 'filter-default';
  let timeoutId;

  filtersGroup.addEventListener('click', (evt) => {
    const allPictures = JSON.parse(JSON.stringify(pictures));
    const shuffledPictures = JSON.parse(JSON.stringify(pictures));
    const sortedPictures = JSON.parse(JSON.stringify(pictures));

    const filter = evt.target.id;
    switch (filter) {
      case 'filter-default':
        newPictures = allPictures;
        break;
      case 'filter-random':
        shuffle(shuffledPictures);
        newPictures = shuffledPictures.slice(0, NUMBER_OF_PICTURES_FOR_RANDOM_FILTER);
        break;
      case 'filter-discussed':
        newPictures = sortedPictures.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }

    [buttonFilterDefault, buttonFilterRandom, buttonFilterDiscussed].forEach((button) => button.classList
      .remove('img-filters__button--active'));
    FILTERS[filter].classList.add('img-filters__button--active');

    if (filter !== currentFilter) {
      currentFilter = filter;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => renderPictures(), DEBOUNCE_DELAY);
    }
  });
};

const initialRenderPictures = (pictures) => {
  filters.classList.remove('img-filters--inactive');
  newPictures = [...pictures];

  renderPictures();
  changeFilter(pictures);
};

export {initialRenderPictures};

