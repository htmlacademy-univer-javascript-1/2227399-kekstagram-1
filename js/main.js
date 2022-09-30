function getRandomNumber(from, to) {
  const max = Math.max(from, to);
  const min = Math.min(from, to);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(1, 100);

function checkCommentLen(comment, maxLen) {
  return comment.length <= maxLen;
}

checkCommentLen('Vacationing in Bali! <3', 20);
