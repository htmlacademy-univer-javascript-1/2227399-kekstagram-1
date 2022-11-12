import {getRandomPositiveInteger, counterContainer, checkStringLength, shuffle} from './utils.js';

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
const MAX_COMMENT_LENGTH = 120;

const randomCommentMessagesContainer = function() {
  const shuffleMESSAGES = shuffle(MESSAGES);
  let i = 0;
  return function () {
    let message = shuffleMESSAGES[i++];
    if (!checkStringLength(message, MAX_COMMENT_LENGTH)) {
      message = message.substring(0, MAX_COMMENT_LENGTH);
    }
    return message;
  };
};

const createRandomComments = function() {
  const commentsCount = getRandomPositiveInteger(0, NAMES.length);
  const commentsID = counterContainer();
  const commentMessages = randomCommentMessagesContainer();

  const commentsArr = [];
  for (let i = 0; i < commentsCount; i++) {
    const avatarID = getRandomPositiveInteger(1, NAMES.length);
    commentsArr[i] = {
      id: commentsID(),
      avatar: `img/avatar-${avatarID}.svg`,
      message: commentMessages(),
      name: NAMES[avatarID - 1]
    };
  }

  return commentsArr;
};

const getRandomPhotos = function() {
  const photosID = counterContainer(1);
  const photosURLID = counterContainer(1);

  const photosArr = [];
  for (let i = 0; i < PHOTOS_COUNT; i++) {
    photosArr[i] = {
      id: photosID(),
      url: `photos/${photosURLID()}.jpg`,
      description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
      likes: getRandomPositiveInteger(15, 200),
      comments: createRandomComments()
    };
  }

  return photosArr;
};

export {getRandomPhotos};
