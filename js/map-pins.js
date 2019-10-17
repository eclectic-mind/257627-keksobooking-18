'use strict';

(function () {

  var AVATAR_SIZE = 40;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var DATA_SRC = 'https://js.dump.academy/keksobooking/data';

  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var mainBlock = document.querySelector('main');

  // активируем карту

  var activateMap = function () {
    map.classList.remove('map--faded');
    map.removeAttribute('disabled');
    mapFilters.classList.remove('ad-form--disabled');
    mapFilters.removeAttribute('disabled');
  };

  // создаём dom-элементы меток и отрисовываем их

  var showLocation = function (allOffers) {
    var fragment = document.createDocumentFragment();

    // создаём метку

    for (var i = 0; i < allOffers.length; i++) {
      var pin = document.createElement('button');
      pin.className = 'map__pin';
      pin.setAttribute('type', 'button');

      // стили метки

      var pinX = allOffers[i].location.x - (PIN_WIDTH / 2);
      var pinY = allOffers[i].location.y - PIN_HEIGHT;
      pin.style.left = pinX + 'px';
      pin.style.top = pinY + 'px';

      // добавляем в метку картинку со всеми стилями

      var pinPic = document.createElement('img');
      pinPic.src = allOffers[i].author.avatar;
      pinPic.alt = allOffers[i].offer.title;
      pinPic.style.width = AVATAR_SIZE + 'px';
      pinPic.style.height = AVATAR_SIZE + 'px';
      pinPic.setAttribute('draggable', false);
      pin.appendChild(pinPic);

      // выводим метку в html

      fragment.appendChild(pin);
      pinsContainer.appendChild(fragment);
    }
    return pinsContainer;
  };

  // обработчики ошибки и успешной загрузки объектов

  var successHandler = function (allOffers) {
    showLocation(allOffers);
  };

  var errorHandler = function (errorMessage) {

    // закрытие окна ошибки

    var closeErrorWindow = function (evt) {
      evt.preventDefault();
      errorTpl.remove();
    };

    var errorTpl = document.querySelector('#error').content.querySelector('div');
    var fragment = document.createDocumentFragment();
    errorTpl.querySelector('p').textContent = errorMessage;
    errorTpl.cloneNode(true);
    fragment.appendChild(errorTpl);
    mainBlock.prepend(fragment);
    errorTpl.querySelector('button').addEventListener('click', closeErrorWindow);
  };

  // выводим метки

  window.load(successHandler, errorHandler, DATA_SRC);

  // изначально неактивный режим

  map.setAttribute('disabled', 'disabled');
  mapFilters.classList.add('ad-form--disabled');
  mapFilters.setAttribute('disabled', 'disabled');

  // добавляем обработчик на контрольный пин для активации страницы

  window.control.addEventListener('mousedown', activateMap);
  window.control.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateMap();
    }
  });

})();
