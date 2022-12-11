import {isESCKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentListFragment = document.createDocumentFragment();

const closeFullScreenButton = bigPicture.querySelector('.big-picture__cancel');
const moreCommentsButton = bigPicture.querySelector('.social__comments-loader');

const COMMENTS_SHOW_NUMBER = 5;

const closeBigPictureListeners = () => {
  document.addEventListener('keydown', (evt) => {
    if (isESCKey(evt.code)) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      moreCommentsButton.removeEventListener('click', onLoadMoreCommentsClickListener);
    }
  }, {once: true});
  closeFullScreenButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    moreCommentsButton.removeEventListener('click', onLoadMoreCommentsClickListener);
  }, {once: true});
};

const fillComment = (comment) => {
  const {avatar, message, name} = comment;

  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__text').textContent = message;
  newComment.querySelector('.social__picture').alt = name;

  commentListFragment.append(newComment);
};

const loadCommentsContainer = (comments) => {
  commentsContainer.innerHTML = '';

  const commentsLength = comments.length;

  let startCommentIndex = 0;
  let endCommentIndex = Math.min(commentsLength, COMMENTS_SHOW_NUMBER);
  return () => {
    for (let i = startCommentIndex; i < endCommentIndex; i++) {
      fillComment(comments[i]);
    }
    commentsContainer.append(commentListFragment);

    bigPicture.querySelector('.social__comment-count').textContent =
      `${ endCommentIndex } из ${ commentsLength } комментариев`;

    if (endCommentIndex === commentsLength) {
      moreCommentsButton.classList.add('hidden');
    } else {
      moreCommentsButton.classList.remove('hidden');
    }

    startCommentIndex += COMMENTS_SHOW_NUMBER;
    endCommentIndex += Math.min(commentsLength - endCommentIndex, COMMENTS_SHOW_NUMBER);
  };
};

let nextComments;
function onLoadMoreCommentsClickListener() {
  nextComments();
}

const fillBigPicture = (miniPicture) => {
  const {url, description, likes, comments} = miniPicture;

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;

  nextComments = loadCommentsContainer(comments);
  moreCommentsButton.addEventListener('click', onLoadMoreCommentsClickListener);
  moreCommentsButton.click();
};

const showBigPicture = (miniPicture) => {
  fillBigPicture(miniPicture);

  document.body.classList.add('modal-open');

  bigPicture.classList.remove('hidden');
  closeBigPictureListeners();
};

export {showBigPicture};
