'use strict';

(function () {

  var TITLES = ['Offer 1', 'Offer 2', 'Offer 3', 'Offer 4', 'Offer 5', 'Offer 6', 'Offer 7', 'Offer 8'];
  var DESCRIPTIONS = ['descrpition 1', 'descrpition 2', 'descrpition 3', 'descrpition 4', 'descrpition 5', 'descrpition 6', 'descrpition 7', 'descrpition 8'];
  var TIMECHECKS = ['12:00', '13:00', '14:00'];
  var HOUSES = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PICS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var AVATAR_SIZE = 40;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 20;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 6;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 8345;

  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters');

  // генерируем объект-объявление

  var generateOffer = function (citymapOffsetWidth) {
    return {
      author: {avatar: window.getRandomImg(1, 8)},
      offer: {
        title: window.chooseRandom(TITLES),
        address:
        window.getRandomInRange(0, citymapOffsetWidth) +
        ', ' +
        window.getRandomInRange(MIN_Y, MAX_Y),
        price: window.getRandomInRange(MIN_PRICE, MAX_PRICE),
        type: window.chooseRandom(HOUSES),
        rooms: window.getRandomInRange(MIN_ROOMS, MAX_ROOMS),
        guests: window.getRandomInRange(MIN_GUESTS, MAX_GUESTS),
        checkin: window.chooseRandom(TIMECHECKS),
        checkout: window.chooseRandom(TIMECHECKS),
        features: window.randomSort(FEATURES),
        description: window.chooseRandom(DESCRIPTIONS),
        photos: window.randomSort(PICS)
      },
      location: {
        x: window.getRandomInRange(0, citymapOffsetWidth),
        y: window.getRandomInRange(MIN_Y, MAX_Y)
      }
    };
  };

  // собираем массив из 8-ми таких объектов

  var generateOffersArray = function (n, citymap) {
    var result = [];
    var mapWidth = citymap.offsetWidth;
    for (var i = 0; i < n; i++) {
      result.push(generateOffer(mapWidth));
    }
    return result;
  };

  // создаём dom-элементы меток и отрисовываем их

  var showLocation = function (allOffers, pinsBlock) {
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
      pinsBlock.appendChild(fragment);
    }
    return pinsBlock;
  };

  // выводим метки

  var offers = generateOffersArray(8, map);
  showLocation(offers, pinsContainer);

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
