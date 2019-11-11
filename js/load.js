'use strict';

(function () {

  var DATA_SRC = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  var loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

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

    xhr.open('GET', DATA_SRC);
    xhr.send();
  };

  var sendData = function (onSuccess, onError) {
    var formData = new FormData(window.form.adForm);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

  window.load = {
    loadData: loadData,
    sendData: sendData
  };

})();
