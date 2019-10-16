'use strict';

(function () {

  var AVATAR_SIZE = 40;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var DATA_SRC = 'https://js.dump.academy/keksobooking/data';

  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');

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

  // выводим метки

  var successHandler = function (allOffers) {
    showLocation(allOffers);
    console.log(allOffers);
      console.log('объявление номер восемь ' + allOffers[8].offer.address);
  };
  var errorHandler = function (errorMessage) {
    console.log('ошибка при загрузке: ' + errorMessage);
  };

  var offers = window.load(successHandler, errorHandler, DATA_SRC);

  // изначально неактивный режим

  map.setAttribute('disabled', 'disabled');
  mapFilters.classList.add('ad-form--disabled');
  mapFilters.setAttribute('disabled', 'disabled');

  // активируем карту

  var activateMap = function () {
    map.classList.remove('map--faded');
    map.removeAttribute('disabled');
    mapFilters.classList.remove('ad-form--disabled');
    mapFilters.removeAttribute('disabled');
  };

  // добавляем обработчик на контрольный пин для активации страницы

  window.control.addEventListener('mousedown', activateMap);
  window.control.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateMap();
    }
  });

})();
