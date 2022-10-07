// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

getRandomPositiveInteger(1, 100);

function checkStringLength(string, maxLen) {
  return string.length <= maxLen;
}

checkStringLength('Vacationing in Bali! <3', 20);

// Функция взята из интернета и доработана=
// Источник - https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
function shuffle(arr) {
  return arr.sort(()=>Math.random()-0.5);
}

function getRandomPositiveIntegerArray(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const arr = new Array (upper - lower);
  for (let i = lower; i < upper; i++) { arr[i - lower] = i; }
  return shuffle(arr);
}

function fillPhoto(id, url, description, comments) {
  return {
    id: id,
    url: url,
    description: description,
    comments: comments
  };
}
function fillComment(id, avatar, message, name) {
  return {
    id: id,
    avatar: avatar,
    message: message,
    name: name
  };
}

const descriptions = [
  'Я с друзьями',
  'Вчера отдыхали, сегодня уже дома',
  'Я чувствую себя прекрасно! А как у вас дела? Рассказывайте в комментариях!',
  '~*~*~',
  'КАК ЖЕ ЭТО КРАСИВО!!1!',
  'На чилле, на раслабоне'
];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = [
  'Кекс',
  'Воланд',
  'Bel0cka',
  '<3_cool-andrew_2007',
  'Олег',
  'Леди Баг'
];

function getRandomComments() {
  const commentsCount = getRandomPositiveInteger(0, 6);
  const commentsIDs = getRandomPositiveIntegerArray(1, 6);

  const commentsArr = [];
  for (let i = 0; i < commentsCount; i++) {
    const avatarID = getRandomPositiveInteger(1, 6);
    commentsArr[i] = fillComment(
      commentsIDs[i],
      `img/avatar-${avatarID}.svg`,
      messages[getRandomPositiveInteger(0, 5)],
      names[avatarID-1]
    );
  }

  return commentsArr;
}

function getRandomPhotos() {
  const photosIDs = getRandomPositiveIntegerArray(1, 25);
  const photosURLIDs = getRandomPositiveIntegerArray(1, 25);

  const photosArr = [];
  for (let i = 0; i < 25; i++) {
    photosArr[i] = fillPhoto(
      photosIDs[i],
      `photos/${photosURLIDs[i]}.jpg`,
      descriptions[getRandomPositiveInteger(0,5)],
      getRandomComments()
    );
  }

  return photosArr;
}

getRandomPhotos();
//console.log(getRandomPhotos());
