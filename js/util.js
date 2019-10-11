'use strict';

(function () {

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

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var CONTROL_SIZE = 65;
  var CONTROL_SPIKE_HEIGHT = 22;
  var AVATAR_SIZE = 40;
  // var MAP_HEIGHT = 750;

  var ENTER_KEYCODE = 13;

  window.util = {
    TITLES: TITLES,
    DESCRIPTIONS: DESCRIPTIONS,
    TIMECHECKS: TIMECHECKS,
    HOUSES: HOUSES,
    FEATURES: FEATURES,
    PICS: PICS,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MIN_GUESTS: MIN_GUESTS,
    MAX_GUESTS: MAX_GUESTS,
    MIN_ROOMS: MIN_ROOMS,
    MAX_ROOMS: MAX_ROOMS,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    CONTROL_SIZE: CONTROL_SIZE,
    CONTROL_SPIKE_HEIGHT: CONTROL_SPIKE_HEIGHT,
    AVATAR_SIZE: AVATAR_SIZE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };

  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var filtersSelect = document.querySelectorAll('.map__filter');
  var allFieldsets = document.querySelectorAll('fieldset');
  var control = document.querySelector('.map__pin--main');
  var addrField = document.querySelector('#address');
  var roomsField = document.querySelector('#room_number');
  var guestsField = document.querySelector('#capacity');
  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');

  // генерируем строку адреса

  var writeAddress = function (x, y) {
    return x.toString() + ', ' + y.toString();
  };

// выводим адрес по умолчанию

  var defaultX = window.util.CONTROL_SIZE / 2;
  var defaultY = window.util.CONTROL_SIZE / 2;
  var defaultAddress = writeAddress(defaultX, defaultY);
  // вывод актуального адреса контрольного пина - будет дописано позже в соответствии с ТЗ,
  // когда мы начнём двигать этот пин и пересчитывать его координаты, а пока так

  var currentX = defaultX;
  var currentY = defaultY + window.util.CONTROL_SPIKE_HEIGHT;
  var currentAddress = writeAddress(currentX, currentY);

  window.globals = {
    map: map,
    control: control,
    adForm: adForm,
    mapFilters: mapFilters,
    filtersSelect: filtersSelect,
    addrField: addrField,
    allFieldsets: allFieldsets,
    roomsField: roomsField,
    guestsField: guestsField,
    pinsContainer: pinsContainer,
    defaultAddress: defaultAddress,
    currentAddress: currentAddress
  };

})();
