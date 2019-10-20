'use strict';

(function () {

  var AVATAR_SIZE = 40;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');
  var control = document.querySelector('.map__pin--main');

  // активируем-дезактивируем карту

  var toggleMapActivate = function (active) {
    if (active) {
      map.classList.remove('map--faded');
      map.removeAttribute('disabled');
      mapFilters.classList.remove('ad-form--disabled');
      mapFilters.removeAttribute('disabled');
    } else {
      map.classList.add('map--faded');
      map.setAttribute('disabled', 'disabled');
      mapFilters.classList.add('ad-form--disabled');
      mapFilters.setAttribute('disabled', 'disabled');
    }
  }

  // отрисовываем картинку в метку

  var drawPinImage = function (offer) {
    var pinPic = document.createElement('img');
    pinPic.src = offer.author.avatar;
    pinPic.alt = offer.offer.title;
    pinPic.style.width = AVATAR_SIZE + 'px';
    pinPic.style.height = AVATAR_SIZE + 'px';
    pinPic.setAttribute('draggable', false);

    return pinPic;
  }

  // отрисовываем метку

  var drawPin = function (offer) {
    var pin = document.createElement('button');
    pin.className = 'map__pin';
    pin.setAttribute('type', 'button');

    // стили метки
    var pinX = offer.location.x - (PIN_WIDTH / 2);
    var pinY = offer.location.y - PIN_HEIGHT;
    pin.style.left = pinX + 'px';
    pin.style.top = pinY + 'px';

    // добавляем в метку картинку со всеми стилями
    pin.appendChild(drawPinImage(offer));

    return pin;
  }

  // создаём dom-элементы меток и отрисовываем их

  var showLocation = function (offers) {
    var fragment = document.createDocumentFragment();

    // создаём метки

    for (var i = 0; i < offers.length; i++) {
      if (i >= 5) break;

      var pin = drawPin(offers[i]);
      fragment.appendChild(pin);
      pinsContainer.appendChild(fragment);
    }
  };

  window.map = {
    control: control,
    toggleMapActivate: toggleMapActivate,
    showLocation: showLocation
  }

})();
