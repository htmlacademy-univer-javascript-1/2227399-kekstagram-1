import {checkStringLength, isESCKey} from './utils.js';
import {sendData} from './client-api.js';
import {PRISTINE_SETTINGS, MAX_COMMENT_LENGTH, MAX_HASHTAGS_NUMBER, ZOOM_STEP, ZOOM_MIN, ZOOM_MAX, EFFECTS} from './data.js';

// global querySelectors
const documentBody = document.querySelector('body');
const uploadImage = document.querySelector('#upload-file');
const overlayImage = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

// form querySelectors
const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

// zoom querySelectors
const zoomOutButton = overlayImage.querySelector('.scale__control--smaller');
const zoomInButton = overlayImage.querySelector('.scale__control--bigger');
const scaleControl = overlayImage.querySelector('.scale__control--value');

const previewImage = overlayImage.querySelector('.img-upload__preview');

// effects querySelectors
const effects = overlayImage.querySelector('.effects__list');
const slider = overlayImage.querySelector('.effect-level__slider');
const effectLevelInput = overlayImage.querySelector('.effect-level__value');
const sliderField = overlayImage.querySelector('.img-upload__effect-level');

// send image to server querySelectors
const successfulSubmission = document.querySelector('#success').content.querySelector('.success');
const errorSubmission = document.querySelector('#error').content.querySelector('.error');
const successButton = successfulSubmission.querySelector('.success__button');
const errorButton = errorSubmission.querySelector('.error__button');

const pristine = new Pristine(form, PRISTINE_SETTINGS, false);

// effects functions

let selectedEffect;
const applyEffectOnImage = (evt) => {
  selectedEffect = evt.target.value;
  const effect = EFFECTS[selectedEffect];
  if (!effect) {
    sliderField.classList.add('hidden');
    previewImage.style.filter = 'none';
    return;
  }
  sliderField.classList.remove('hidden');

  const {min, max, step} = effect;

  slider.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step,
  });
  const effectsPreview = evt.target.parentNode.querySelector('.effects__preview');
  previewImage.classList.add(effectsPreview.getAttribute('class').split('  ')[1]);
};

const onEffectsChangeListener = (evt) => {
  applyEffectOnImage(evt);
};

const changeEffectIntensity = () => {
  const sliderValue = slider.noUiSlider.get();
  effectLevelInput.value = sliderValue;
  const effect = EFFECTS[selectedEffect];
  previewImage.style.filter = effect ? `${effect.style}(${sliderValue}${effect.unit})` : '';
};

// zoom functions

let scaleValue = parseInt(scaleControl.value.replace('%', ''), 10);
const onZoomInButtonClickListener = () => {
  scaleValue += ZOOM_STEP;
  scaleValue = (scaleValue > ZOOM_MAX) ? ZOOM_MAX : scaleValue;
  scaleControl.value = `${ scaleValue }%`;
  previewImage.style.transform = `scale(${ scaleValue / 100 })`;
};

const onZoomOutButtonClickListener = () => {
  scaleValue -= ZOOM_STEP;
  scaleValue = (scaleValue < ZOOM_MIN) ? ZOOM_MIN : scaleValue;
  scaleControl.value = `${ scaleValue }%`;
  previewImage.style.transform = `scale(${ scaleValue / 100 })`;
};

// main functions

const closeOverlayImage = () => {
  uploadImage.value = '';
  form.reset();

  document.removeEventListener('keydown', onOverlayImageESCKeydown);
  zoomOutButton.removeEventListener('click', onZoomOutButtonClickListener);
  zoomInButton.removeEventListener('click', onZoomInButtonClickListener);

  effects.removeEventListener('change', onEffectsChangeListener);
  slider.noUiSlider.destroy();

  overlayImage.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pristine.destroy();
};

function onOverlayImageESCKeydown(evt) {
  if (isESCKey(evt.key) && evt.target !== hashtagInput && evt.target !== commentInput) {
    closeOverlayImage();
  }
}

uploadImage.addEventListener('change', () => {
  document.addEventListener('keydown', onOverlayImageESCKeydown);
  closeButton.addEventListener('click', closeOverlayImage, {once: true});

  scaleValue = 100;
  scaleControl.value = '100%';
  previewImage.style.transform = 'scale(1)';
  zoomOutButton.addEventListener('click', onZoomOutButtonClickListener);
  zoomInButton.addEventListener('click', onZoomInButtonClickListener);

  selectedEffect = 'effect-none';
  previewImage.classList.add('effects__preview--none');
  effects.addEventListener('change', onEffectsChangeListener);

  sliderField.classList.add('hidden');
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower'
  });
  slider.noUiSlider.on('update', () => {
    changeEffectIntensity();
  });

  document.body.classList.add('modal-open');
  overlayImage.classList.remove('hidden');
});

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onCloseSuccessSendMsgClickListener = (evt) => {
  if (evt.target === successfulSubmission) {
    closeSendMessages();
  }
};

const onCloseErrorSendMsgClickListener = (evt) => {
  if (evt.target === errorSubmission) {
    closeSendMessages();
  }
};

const onErrorSendMsgEscKeydownListener = (evt) => {
  if (isESCKey(evt.key)) {
    closeSendMessages();
  }
};

function closeSendMessages() {
  if (documentBody.contains(successfulSubmission)) {
    documentBody.removeChild(successfulSubmission);
  }
  if (documentBody.contains(errorSubmission)) {
    overlayImage.classList.remove('hidden');
    documentBody.removeChild(errorSubmission);
  }

  document.removeEventListener('keydown', onErrorSendMsgEscKeydownListener);
  document.removeEventListener('click', onCloseSuccessSendMsgClickListener);
  document.removeEventListener('click', onCloseErrorSendMsgClickListener);
  successButton.removeEventListener('click', closeSendMessages);
  errorButton.removeEventListener('click', closeSendMessages);
}

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
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    disableSubmitButton();
    sendData(
      () => {
        closeOverlayImage();
        enableSubmitButton();
        successButton.addEventListener('click', closeSendMessages);
        document.addEventListener('keydown', onErrorSendMsgEscKeydownListener);
        document.addEventListener('click', onCloseSuccessSendMsgClickListener);
        documentBody.appendChild(successfulSubmission);
      },
      () => {
        overlayImage.classList.add('hidden');
        enableSubmitButton();
        errorButton.addEventListener('click', closeSendMessages);
        document.addEventListener('keydown', onErrorSendMsgEscKeydownListener);
        document.addEventListener('click', onCloseErrorSendMsgClickListener);
        documentBody.appendChild(errorSubmission);
      },
      new FormData(evt.target),
    );
  }

});
