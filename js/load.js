'use strict';

(function () {

  window.DATA_SRC = 'https://js.dump.academy/keksobooking/data';
  var mainBlock = document.querySelector('main');
  var errorTpl = document.querySelector('#error').content.querySelector('div');

  // подгрузка данных с сервера

  window.load = function (onSuccess, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open('GET', url);
    xhr.send();
  };

  // обработчик ошибки

  var onError = function (errorMessage) {
    // закрытие окна ошибки
    var closeErrorWindow = function (evt) {
      evt.preventDefault();
      errorTpl.remove();
    };
    // console.log(errorTpl);
    var fragment = document.createDocumentFragment();
    errorTpl.querySelector('p').textContent = errorMessage;
    errorTpl.cloneNode(true);
    fragment.appendChild(errorTpl);
    mainBlock.prepend(fragment);
    errorTpl.querySelector('button').addEventListener('click', closeErrorWindow);
  };

})();
