import {checkStringLength, isESCKey} from './utils.js';

// global querySelectors
const uploadImage = document.querySelector('#upload-file');
const overlayImage = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

// form querySelectors
const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
//const submitButton = form.querySelector('.img-upload__submit');

//constants
const MAX_HASHTAGS_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;
const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text-invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text-invalid__error'
}, false);

//functions

const closeOverlayImage = () => {
  uploadImage.value = '';
  form.reset();

  document.removeEventListener('keydown', onOverlayImageESCKeydown);

  overlayImage.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pristine.destroy();
};

const onOverlayImageESCKeydown = (evt) => {
  if (isESCKey(evt.key) && evt.target !== hashtagInput && evt.target !== commentInput) {
    closeOverlayImage();
  }
};

uploadImage.addEventListener('change', () => {
  document.addEventListener('keydown', onOverlayImageESCKeydown);
  closeButton.addEventListener('click', closeOverlayImage, {once: true});

  document.body.classList.add('modal-open');
  overlayImage.classList.remove('hidden');
});

//validation

// hashtags

const hashtagRegex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const splitValue = (value) => value.split(' ');

const isCorrectHashtag = (value) => hashtagRegex.test(value);
const isCorrectHashtagsNumber = (values) => {
  const hashtags = splitValue(values);
  return hashtags.length <= MAX_HASHTAGS_NUMBER;
};
const isNoDuplicatesHashtags = (values) => {
  const hashtags = splitValue(values);
  const lowerCaseHashtags = [];
  for (const hashtag of hashtags) {
    lowerCaseHashtags.push(hashtag.toLowerCase());
  }
  return (new Set(lowerCaseHashtags)).size === lowerCaseHashtags.length;
};
const validateHashtags = (values) => {
  if (values === '') {
    return true;
  }
  const hashtags = splitValue(values);
  return hashtags.every(isCorrectHashtag);
};

pristine.addValidator(
  hashtagInput,
  (values) => isCorrectHashtagsNumber(values),
  'Максимальное количество хештегов - 5!',
  1
);

pristine.addValidator(
  hashtagInput,
  (values) => isNoDuplicatesHashtags(values),
  'Хэштэги не должны повторяться!',
  2
);

pristine.addValidator(
  hashtagInput,
  (value) => validateHashtags(value),
  'Хэштэг может содержать только буквы и цифры. Максимальная длина хештега - 20 символов.',
  3
);

// comments

const isCorrectComment = (value) => checkStringLength(value, MAX_COMMENT_LENGTH);

pristine.addValidator(
  commentInput,
  (value) => isCorrectComment(value),
  'Длина комментария не должна превышать 140 символов!'
);

// pristine form submit event listener

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
