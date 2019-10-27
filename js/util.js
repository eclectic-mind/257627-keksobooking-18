'use strict';

(function () {

  var CONTROL_SIZE = 65;
  var CONTROL_SPIKE_HEIGHT = 22;
  var ENTER_KEYCODE = 13;

  // случайное число из диапазона

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // случайный элемент из нескольких имеющихся

  var chooseRandom = function (arr) {
    return arr[window.getRandomInRange(0, arr.length)];
  };

  // случайная картинка

  var getRandomImg = function (min, max) {
    var num = window.getRandomInRange(min, max);
    return 'img/avatars/user0' + num + '.png';
  };

  // случайная сортировка массива

  var randomSort = function (arr) {
    var sortFunc = function () {
      return 0.5 - Math.random();
    };
    return arr.sort(sortFunc);
  };

  window.util = {
    CONTROL_SIZE: CONTROL_SIZE,
    CONTROL_SPIKE_HEIGHT: CONTROL_SPIKE_HEIGHT,
    ENTER_KEYCODE: ENTER_KEYCODE,

    getRandomInRange: getRandomInRange,
    chooseRandom: chooseRandom,
    getRandomImg: getRandomImg,
    randomSort: randomSort
  };

})();
