//server addresses
const GET_SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';

//photos descriptions constants
const MAX_HASHTAGS_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;

//filters constants
const DEBOUNCE_DELAY = 500;
const NUMBER_OF_PICTURES_FOR_RANDOM_FILTER = 10;

//Pristine object
const PRISTINE_SETTINGS = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text--invalid__error'
};

//scale constants
const ZOOM_STEP = 25;
const ZOOM_MIN = 25;
const ZOOM_MAX = 100;

//effects list
const EFFECTS = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'grayscale',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    style: 'invert',
    unit: '%',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'sepia',
    unit: '',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    style: 'brightness',
    unit: '',
  }
};

//allowed input file types
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

//export
export {
  GET_SERVER_ADDRESS,
  SEND_SERVER_ADDRESS,
  MAX_COMMENT_LENGTH,
  MAX_HASHTAGS_NUMBER,
  DEBOUNCE_DELAY,
  NUMBER_OF_PICTURES_FOR_RANDOM_FILTER,
  PRISTINE_SETTINGS,
  ZOOM_STEP,
  ZOOM_MIN,
  ZOOM_MAX,
  EFFECTS,
  FILE_TYPES
};
