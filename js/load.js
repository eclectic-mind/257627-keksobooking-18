'use strict';

(function () {

  var DATA_SRC = 'https://js.dump.academy/keksobooking/data';

  // var mainBlock = document.querySelector('main');
  // var errorTpl = document.querySelector('#error').content.querySelector('div');

  // подгрузка данных с сервера

  var loadData = function (onSuccess, onError, url, holder) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        jsonToArray(xhr.response, holder);
        window.map.showLocation(xhr.response);
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

    xhr.open('GET', url);
    xhr.send();
  };

  var jsonToArray = function (data, holder) {
    for (var i = 0; i < data.length; i++) {
      holder.push(data[i]);
    }
    return holder;
  };

  window.load = {
    DATA_SRC: DATA_SRC,
    loadData: loadData,
    jsonToArray: jsonToArray
  }

})();
