'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var allFieldsets = document.querySelectorAll('fieldset');
  var roomsField = document.querySelector('#room_number');
  var guestsField = document.querySelector('#capacity');
  var addrField = document.querySelector('#address');
  var titleField = document.querySelector('#title');
  var priceField = document.querySelector('#price');
  var typeField = document.querySelector('#type');
  var checkinField = document.querySelector('#timein');
  var checkoutField = document.querySelector('#timeout');
  var submitButton = document.querySelector('.ad-form__submit');

  var defaultX = window.map.startX + (window.util.CONTROL_SIZE / 2);
  var defaultY = window.map.startY + (window.util.CONTROL_SIZE / 2);
  var defaultAddress = null;

  var currentX = defaultX;
  var currentY = defaultY + window.util.CONTROL_SPIKE_HEIGHT;
  var currentAddress = null;

  var writeAddress = function (x, y) {
    return x.toString() + ', ' + y.toString();
  };

  var getCurrentAddress = function () {
    var c = window.map.control;
    var currX = c.offsetLeft;
    var currY = c.offsetTop;
    var addr = writeAddress(currX, currY);
    return addr;
  };

  var rewriteAddress = function () {
    currentAddress = getCurrentAddress();
    return currentAddress;
  };

  var toggleFormActivate = function (active) {
    if (active) {
      addrField.value = currentAddress;
      adForm.classList.remove('ad-form--disabled');
      adForm.removeAttribute('disabled');
      allFieldsets.forEach(function (item) {
        item.removeAttribute('disabled');
      });
    } else {
      addrField.value = defaultAddress;
      adForm.classList.add('ad-form--disabled');
      adForm.setAttribute('disabled', 'disabled');
      allFieldsets.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
    }
  };

  var checkGuests = function () {
    var selectedRooms = parseInt(roomsField.value, 10);
    var selectedGuests = parseInt(guestsField.value, 10);
    var errMessage = '';
    if (selectedGuests > selectedRooms || (selectedRooms === 100 && selectedGuests !== 0)) {
      errMessage = 'Количество гостей не соответствует выбранному количеству комнат';
    }
    guestsField.setCustomValidity(errMessage);
  };

  var validateTitle = function () {
    var title = titleField.value;
    var errMessage = '';
    if (title.length < 30 || title.length > 100) {
      errMessage = 'Недопустимая длина заголовка';
    }
    titleField.setCustomValidity(errMessage);
  };

  var checkPrice = function () {
    var errMessage = '';
    var tp = typeField.value;
    var pr = priceField.value;
    if (pr < 0) {
      errMessage = 'Цена не может быть меньше нуля';
    } else if (pr < 10000 && tp === 'palace') {
      errMessage = 'Минимальная цена на дворец составляет 10000';
    } else if (pr < 5000 && tp === 'house') {
      errMessage = 'Минимальная цена на дом составляет 5000';
    } else if (pr < 1000 && tp === 'flat') {
      errMessage = 'Минимальная цена на квартиру составляет 1000';
    }
    priceField.setCustomValidity(errMessage);
  };

  var checkTime = function () {
    var errMessage = '';
    var tIn = parseInt(checkinField.value, 10);
    var tOut = parseInt(checkoutField.value, 10);
    if (tIn !== tOut) {
      errMessage = 'Время заезда не соответствует времени выезда';
    }
    checkinField.setCustomValidity(errMessage);
  };

  defaultAddress = writeAddress(defaultX, defaultY);
  currentAddress = getCurrentAddress();
  addrField.value = defaultAddress;
  titleField.addEventListener('change', validateTitle);
  priceField.addEventListener('change', checkPrice);
  roomsField.addEventListener('change', checkGuests);
  guestsField.addEventListener('change', checkGuests);
  checkinField.addEventListener('change', checkTime);
  checkoutField.addEventListener('change', checkTime);

  window.form = {
    adForm: adForm,
    submitButton: submitButton,
    currentAddress: currentAddress,
    currentX: currentX,
    currentY: currentY,
    roomsField: roomsField,
    guestsField: guestsField,
    titleField: titleField,
    priceField: priceField,
    typeField: typeField,
    checkinField: checkinField,
    checkoutField: checkoutField,
    getCurrentAddress: getCurrentAddress,
    rewriteAddress: rewriteAddress,
    toggleFormActivate: toggleFormActivate,
    checkGuests: checkGuests,
    validateTitle: validateTitle,
    checkPrice: checkPrice,
    checkTime: checkTime
  };

})();
