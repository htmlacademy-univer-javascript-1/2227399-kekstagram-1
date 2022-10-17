function checkStringLength(string, maxLen) {
  return string.length <= maxLen;
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveIntegerArray(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const arr = new Array(upper - lower);
  for (let i = lower; i < upper; i++) {
    arr[i - lower] = i;
  }
  return shuffle(arr);
}

// Функция взята из интернета и доработана
// Источник - https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export {getRandomPositiveInteger, getRandomPositiveIntegerArray, checkStringLength};
