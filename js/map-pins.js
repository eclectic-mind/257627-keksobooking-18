'use strict';

(function () {

  var AVATAR_SIZE = 40;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinsContainer = document.querySelector('.map__pins');

  // активируем карту

  var activateMap = function () {
    window.map.classList.remove('map--faded');
    window.map.removeAttribute('disabled');
  };

  // создаём dom-элементы меток и отрисовываем их

  var showLocation = function (allOffers) {
    var fragment = document.createDocumentFragment();

    // создаём метку

    for (var i = 0; i < allOffers.length; i++) {
      if (i >= 5) break;

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

  var pins = window.load(showLocation, window.DATA_SRC);
  console.log(pins);

  // изначально неактивный режим

  window.map.setAttribute('disabled', 'disabled');

  // добавляем обработчик на контрольный пин для активации карты

  window.control.addEventListener('mousedown', activateMap);
  window.control.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateMap();
    }
  });

})();
