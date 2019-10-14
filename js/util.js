'use strict';

(function () {

  var CONTROL_SIZE = 65;
  var CONTROL_SPIKE_HEIGHT = 22;
  var ENTER_KEYCODE = 13;

  window.util = {
    CONTROL_SIZE: CONTROL_SIZE,
    CONTROL_SPIKE_HEIGHT: CONTROL_SPIKE_HEIGHT,
    ENTER_KEYCODE: ENTER_KEYCODE
  };

  window.control = document.querySelector('.map__pin--main');

  // случайное число из диапазона

  window.getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // случайный элемент из нескольких имеющихся

  window.chooseRandom = function (arr) {
    return arr[window.getRandomInRange(0, arr.length)];
  };

  // случайная картинка

  window.getRandomImg = function (min, max) {
    var num = window.getRandomInRange(min, max);
    return 'img/avatars/user0' + num + '.png';
  };

  // случайная сортировка массива

  window.randomSort = function (arr) {
    var sortFunc = function () {
      return 0.5 - Math.random();
    };
    return arr.sort(sortFunc);
  };

})();
