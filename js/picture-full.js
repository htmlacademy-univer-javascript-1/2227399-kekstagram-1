const bigPicture = document.querySelector('.big-picture');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentListFragment = document.createDocumentFragment();

const closeFullScreenButton = bigPicture.querySelector('.big-picture__cancel');
const ESCAPE_KEYCODE = 'Escape';

const closeBigPictureListeners = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.code === ESCAPE_KEYCODE) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
  closeFullScreenButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
};

const fillComment = (comment) => {
  commentsContainer.innerHTML = '';
  const {avatar, message, name} = comment;

  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__text').textContent = message;
  newComment.querySelector('.social__picture').alt = name;

  commentListFragment.append(newComment);
};

const fillBigPicture = (miniPicture) => {
  const {url, description, likes, comments} = miniPicture;

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  comments.forEach((comment) => fillComment(comment));
  commentsContainer.append(commentListFragment);
};

const showBigPicture = (miniPicture) => {
  fillBigPicture(miniPicture);

  //temp
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  document.body.classList.add('modal-open');

  bigPicture.classList.remove('hidden');
  closeBigPictureListeners();
};

export {showBigPicture};
