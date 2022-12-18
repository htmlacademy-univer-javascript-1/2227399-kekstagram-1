const GET_SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_SERVER_ADDRESS = 'https://26.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(GET_SERVER_ADDRESS)
    .then((response) => {
      if (response.ok) {
        response.json().then((posts) => {
          onSuccess(posts);
        });
      } else {
        throw new Error('Not OK response');
      }
    })
    .catch(() => {
      onFail('Не удалось загрузить данные. Попробуйте ещё раз.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_SERVER_ADDRESS,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз.');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз.');
    });
};

export {getData, sendData};
