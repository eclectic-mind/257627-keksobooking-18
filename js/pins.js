'use strict';

(function () {



// создаём dom-элементы меток и отрисовываем их

var showLocation = function (allOffers, pinsBlock) {
  var fragment = document.createDocumentFragment();

  // создаём метку

  for (var i = 0; i < allOffers.length; i++) {
    var pin = document.createElement('button');
    pin.className = 'map__pin';
    pin.setAttribute('type', 'button');

    // стили метки

    var pinX = allOffers[i].location.x - (window.util.PIN_WIDTH / 2);
    var pinY = allOffers[i].location.y - window.util.PIN_HEIGHT;
    pin.style.left = pinX + 'px';
    pin.style.top = pinY + 'px';

    // добавляем в метку картинку со всеми стилями

    var pinPic = document.createElement('img');
    pinPic.src = allOffers[i].author.avatar;
    pinPic.alt = allOffers[i].offer.title;

    pinPic.style.width = window.util.AVATAR_SIZE + 'px';
    pinPic.style.height = window.util.AVATAR_SIZE + 'px';

    pinPic.setAttribute('draggable', false);
    pin.appendChild(pinPic);

    // выводим метку в html

    fragment.appendChild(pin);
    pinsBlock.appendChild(fragment);
  }
  return pinsBlock;
};

// выводим метки

var offers = window.generateOffersArray(8, window.globals.map);
showLocation(offers, window.globals.pinsContainer);



})();
