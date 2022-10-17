import {getRandomPositiveInteger, getRandomPositiveIntegerArray, checkStringLength} from './utils';

const DESCRIPTIONS = [
  'Я с друзьями',
  'Вчера отдыхали, сегодня уже дома',
  'Я чувствую себя прекрасно! А как у вас дела? Рассказывайте в комментариях!',
  '~*~*~',
  'КАК ЖЕ ЭТО КРАСИВО!!1!',
  'На чилле, на раслабоне'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Кекс',
  'Воланд',
  'Bel0cka',
  '<3_cool-andrew_2007',
  'Олег',
  'Леди Баг'
];

const PHOTOS_COUNT = 25;

function getRandomPhotos() {
  const photosIDs = getRandomPositiveIntegerArray(1, PHOTOS_COUNT);
  const photosURLIDs = getRandomPositiveIntegerArray(1, PHOTOS_COUNT);

  const photosArr = [];
  for (let i = 0; i < PHOTOS_COUNT; i++) {
    photosArr[i] = {
      id: photosIDs[i],
      url: `photos/${photosURLIDs[i]}.jpg`,
      description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
      comments: getRandomComments()
    };
  }

  return photosArr;
}

function getRandomComments() {
  const commentsCount = getRandomPositiveInteger(0, NAMES.length);
  const commentsIDs = getRandomPositiveIntegerArray(1, NAMES.length);

  const commentsArr = [];
  for (let i = 0; i < commentsCount; i++) {
    const avatarID = getRandomPositiveInteger(1, NAMES.length);
    commentsArr[i] = {
      id: commentsIDs[i],
      avatar: `img/avatar-${avatarID}.svg`,
      message: createCommentMessage(),
      name: NAMES[avatarID - 1]
    };
  }

  return commentsArr;
}

function createCommentMessage() {
  const MAX_COMMENT_LENGTH = 20;
  let message = MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)];
  if (!checkStringLength(MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)], MAX_COMMENT_LENGTH)) {
    message = message.substring(0, MAX_COMMENT_LENGTH);
  }

  return message;
}

export {getRandomPhotos};
