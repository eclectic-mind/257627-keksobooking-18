'use strict';

(function () {

  var DATA_SRC = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var STATUS_OK = 200;

  var loadFromServer = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
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

    xhr.open('GET', DATA_SRC);
    xhr.send();
  };

  var loadToServer = function (onSuccess, onError) {
    var formData = new FormData(window.add.adForm);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess();
        JSON.parse(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Отправка не удалась');
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(formData);
  };

  window.data = {
    STATUS_OK: STATUS_OK,
    loadFromServer: loadFromServer,
    loadToServer: loadToServer
  };

})();
