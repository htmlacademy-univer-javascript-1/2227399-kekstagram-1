const checkStringLength = (string, maxLen) => string.length <= maxLen;

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomPositiveInteger = function(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const counterContainer = function (startCount = 0) {
  let i = startCount;
  return () => i++;
};

// Функция взята из интернета и доработана
// Источник - https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
const shuffle = function(arr) {
  return arr.sort(() => Math.random() - 0.5);
};

const ESCAPE_KEYCODE = 'Escape';
const isESCKey = (keyCode) => keyCode === ESCAPE_KEYCODE;

export {getRandomPositiveInteger, counterContainer, shuffle, checkStringLength, isESCKey};
