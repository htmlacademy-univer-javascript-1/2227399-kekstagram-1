function checkStringLength(string, maxLen) {
  return string.length <= maxLen;
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomPositiveInteger = function(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const counterIDsContainer = function () {
  let i = 0;
  return function () {
    return i++;
  };
};

// Функция взята из интернета и доработана
// Источник - https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
const shuffle = function(arr) {
  return arr.sort(() => Math.random() - 0.5);
};

export {getRandomPositiveInteger, counterIDsContainer, shuffle, checkStringLength};
