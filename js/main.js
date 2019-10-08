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

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
// var CONTROL_SIZE = 65;
var CONTROL_SPIKE_HEIGHT = 22;
var AVATAR_SIZE = 40;
var MAP_HEIGHT = 750;

var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var filtersSelect = document.querySelectorAll('.map__filter');
var allFieldsets = document.querySelectorAll('fieldset');
var control = document.querySelector('.map__pin--main');
var addrField = document.querySelector('#address');

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

// создаём блок map, убираем класс, создаём контейнер для меток

var map = document.querySelector('.map');
// map.classList.remove('.map--faded');

var pinsContainer = document.querySelector('.map__pins');

// выводим метки

var offers = generateOffersArray(8, map);
showLocation(offers, pinsContainer);

// вывод адреса по умолчанию

var defaultX = map.offsetWidth / 2;
var defaultY = MAP_HEIGHT / 2;
var defaultAddress = defaultX + ', ' + defaultY;

// вывод актуального адреса главной метки

var currentX = defaultX;
var currentY = defaultY + CONTROL_SPIKE_HEIGHT;
var currentAddress = currentX + ', ' + currentY;

// активный и неактивный режимы


map.setAttribute('disabled', 'disabled');
mapFilters.classList.add('ad-form--disabled');
mapFilters.setAttribute('disabled', 'disabled');
filtersSelect.forEach(function (item) {
  item.setAttribute('disabled', 'disabled');
});
allFieldsets.forEach(function (item) {
  item.setAttribute('disabled', 'disabled');
});
addrField.value = defaultAddress;

var activateAllForms = function () {
  addrField.value = currentAddress;
  map.classList.remove('map--faded');
  map.removeAttribute('disabled');
  adForm.classList.remove('ad-form--disabled');
  adForm.removeAttribute('disabled');
  mapFilters.classList.remove('ad-form--disabled');
  mapFilters.removeAttribute('disabled');
  filtersSelect.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  allFieldsets.forEach(function (item) {
    item.removeAttribute('disabled');
  });
};

/*
var disactivateAllForms = function (citymap, form, filters, filtSelects, fieldsets) {
  addrField.value = defaultAddress;
  citymap.classList.add('map--faded');
  citymap.setAttribute('disabled');
  form.classList.add('ad-form--disabled');
  form.setAttribute('disabled');
  filters.classList.add('ad-form--disabled');
  filters.setAttribute('disabled');
  filtSelects.forEach(function (item) {
    item.setAttribute('disabled');
  });
  fieldsets.forEach(function (item) {
    item.settAttribute('disabled');
  });
};
*/
control.addEventListener('mousedown', function () {
  activateAllForms();
}, false);
control.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activateAllForms();
  }
});

// соотношение гостей и комнат

/*
var checkMaximumGuests = function (rvalue, gvalue) {
  if ((rvalue === 100 && gvalue !== 0) || (rvalue === 1 && gvalue !== 1) || (rvalue === 2 && gvalue < 1) || (rvalue === 2 && gvalue > 2) || (rvalue === 3 && gvalue < 1) || (rvalue === 3 && gvalue > 3)) {
    return false;
  }
  else return true;
};
*/

/*
var checkMaximumGuests = function (roomsQuantity, guestsQuantity) {
  if (roomsQuantity === 100 && guestsQuantity === 0) return true;
  else if (roomsQuantity >= guestsQuantity) return true;
  else return false;
};
*/

var checkMaximumGuests = function (roomsQuantity, guestsQuantity) {
  if (roomsQuantity === 100) {
    if (guestsQuantity === 0) {
      return true;
    }
  }
  else if (guestsQuantity <= roomsQuantity) {
    return true;
  }
  else {
    return false;
  }
};


var validate = function (fieldOneValue, fieldTwoValue, field, message) {
  if (!checkMaximumGuests(fieldOneValue, fieldTwoValue)) {
    field.setCustomValidity(message);
    // console.log('ошибка');
  } else {
    field.setCustomValidity('');
    // console.log('всё ок');
  }
};

/*
var checkMaximumGuests = function (roomsQuantity, guestsQuantity) {
  if (roomsQuantity <= 3 && guestsQuantity >= 1 && guestsQuantity <= roomsQuantity) {
    // console.log('гостей ' + guestsQuantity + ', комнат ' + roomsQuantity + ', всё ок!');
    return true;
  }
  else if (roomsQuantity === 100 && guestsQuantity === 0) {
    // console.log('гостей ' + guestsQuantity + ', комнат ' + roomsQuantity + ', всё ок!');
    return true;
  } else {
    // console.log('всё плохо!');
    return false;
  }
};
*/

// ловим количество комнат и гостей из полей основной формы

/* var catchSelected = function (select) {
  return select.options[select.options.selectedIndex].value;
};
*/

var roomsField = document.querySelector('#room_number');
var guestsField = document.querySelector('#capacity');
var roomsValue = roomsField.value;
// console.log(roomsValue);

// как вариант -
// var roomsValue = catchSelected(roomsField);

var guestsValue = guestsField.value;
// console.log(guestsValue);

roomsField.addEventListener('change', function () {
  roomsValue = roomsField.value;
  // console.log('комнат ' + roomsValue);
  return roomsValue;
});

guestsField.addEventListener('change', function () {
  guestsValue = guestsField.value;
  // console.log('гостей ' + guestsValue);
  return guestsValue;
});

validate(roomsValue, guestsValue, guestsField, 'Количество комнат не соответствует количеству гостей!');
