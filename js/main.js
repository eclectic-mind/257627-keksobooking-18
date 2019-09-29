'use strict';

var TITLES = ['Offer 1', 'Offer 2', 'Offer 3', 'Offer 4', 'Offer 5', 'Offer 6', 'Offer 7', 'Offer 8'];
var DESCRIPTIONS = ['descrpition 1', 'descrpition 2', 'descrpition 3', 'descrpition 4', 'descrpition 5', 'descrpition 6', 'descrpition 7', 'descrpition 8'];
var TIMECHECKS = ['12:00', '13:00', '14:00'];
var HOUSES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PICS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_GUESTS = 1;
var MAX_GUESTS = 20;
var MIN_ROOMS = 1;
var MAX_ROOMS = 6;
var MIN_PRICE = 1000;
var MAX_PRICE = 8345;

// случайное число из диапазона

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// случайный элемент из нескольких имеющихся

var chooseRandom = function (arr) {
  return arr[getRandomInRange(0, arr.length)];
};

// случайная картинка

var getRandomImg = function (min, max) {
  var num = getRandomInRange(min, max);
  return 'img/avatars/user/0' + num + '.png';
};

// случайная сортировка массива

var randomSort = function (arr) {
  var sortFunc = function () {
    return 0.5 - Math.random();
  };
  return arr.sort(sortFunc);
};

// генерируем объект-объявление

var generateOffer = function (citymapOffsetWidth) {
  return {
    author: {avatar: getRandomImg(1, 8)},
    offer: {
      title: chooseRandom(TITLES),
      address:
        getRandomInRange(0, citymapOffsetWidth) +
        ', ' +
        getRandomInRange(MIN_Y, MAX_Y),
      price: getRandomInRange(MIN_PRICE, MAX_PRICE),
      type: chooseRandom(HOUSES),
      rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInRange(MIN_GUESTS, MAX_GUESTS),
      checkin: chooseRandom(TIMECHECKS),
      checkout: chooseRandom(TIMECHECKS),
      features: randomSort(FEATURES),
      description: chooseRandom(DESCRIPTIONS),
      photos: randomSort(PICS)
    },
    location: {
      x: getRandomInRange(0, citymapOffsetWidth),
      y: getRandomInRange(MIN_Y, MAX_Y)
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

    var pinX = allOffers[i].location.x - 50;
    var pinY = allOffers[i].location.y - 82;
    pin.style.left = pinX + 'px';
    pin.style.top = pinY + 'px';

    // добавляем в метку картинку со всеми стилями

    var pinPic = document.createElement('img');
    pinPic.src = allOffers[i].author.avatar;
    pinPic.alt = allOffers[i].offer.title;
    pinPic.style.width = 40;
    pinPic.style.height = 40;
    pinPic.setAttribute('draggable', false);
    pin.appendChild(pinPic);

    // выводим метку в html

    fragment.appendChild(pin);
    pinsBlock.appendChild(fragment);
  }
  return pinsBlock;
};

// создаём блок map, убираем класс, создаём контейнер для меток

var map = document.querySelector('.map');
map.classList.remove('.map--faded');

var pinsContainer = document.querySelector('.map__pins');

// выводим метки

var offers = generateOffersArray(8, map);
showLocation(offers, pinsContainer);
