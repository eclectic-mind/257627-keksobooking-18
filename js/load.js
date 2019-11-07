'use strict';

(function () {

  var DATA_SRC = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  // var mainBlock = document.querySelector('main');
  // var errorTpl = document.querySelector('#error').content.querySelector('div');

  // подгрузка данных с сервера

  var loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        // jsonToArray(xhr.response, holder);
        // window.map.showLocation(xhr.response);
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

  var jsonToArray = function (data, holder) {
    for (var i = 0; i < data.length; i++) {
      holder.push(data[i]);
    }
    return holder;
  };

  var sendData = function (onSuccess, onError) {
    var formData = new FormData(window.form.adForm);
    console.log(formData);

    var xhr = new XMLHttpRequest();
    //xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
        var data = JSON.parse(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Отправка не удалась');
    });

    xhr.open('POST', UPLOAD_URL);
    xhr.send(formData);
    console.log('данные ушли!');
  };

  window.load = {
    DATA_SRC: DATA_SRC,
    UPLOAD_URL: UPLOAD_URL,
    loadData: loadData,
    sendData: sendData,
    jsonToArray: jsonToArray
  };

})();
