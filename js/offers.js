'use strict';

(function () {

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
    return 'img/avatars/user0' + num + '.png';
  };

  // случайная сортировка массива

  var randomSort = function (arr) {
    var sortFunc = function () {
      return 0.5 - Math.random();
    };
    return arr.sort(sortFunc);
  };

  // генерируем объект-объявление

  window.generateOffer = function (citymapOffsetWidth) {
    return {
      author: {avatar: getRandomImg(1, 8)},
      offer: {
        title: chooseRandom(window.util.TITLES),
        address:
        getRandomInRange(0, citymapOffsetWidth) +
        ', ' +
        getRandomInRange(window.util.MIN_Y, window.util.MAX_Y),
        price: getRandomInRange(window.util.MIN_PRICE, window.util.MAX_PRICE),
        type: chooseRandom(window.util.HOUSES),
        rooms: getRandomInRange(window.util.MIN_ROOMS, window.util.MAX_ROOMS),
        guests: getRandomInRange(window.util.MIN_GUESTS, window.util.MAX_GUESTS),
        checkin: chooseRandom(window.util.TIMECHECKS),
        checkout: chooseRandom(window.util.TIMECHECKS),
        features: randomSort(window.util.FEATURES),
        description: chooseRandom(window.util.DESCRIPTIONS),
        photos: randomSort(window.util.PICS)
      },
      location: {
        x: getRandomInRange(0, citymapOffsetWidth),
        y: getRandomInRange(window.util.MIN_Y, window.util.MAX_Y)
      }
    };
  };

  // собираем массив из 8-ми таких объектов

  window.generateOffersArray = function (n, citymap) {
    var result = [];
    var mapWidth = citymap.offsetWidth;
    for (var i = 0; i < n; i++) {
      result.push(window.generateOffer(mapWidth));
    }
    return result;
  };

})();
