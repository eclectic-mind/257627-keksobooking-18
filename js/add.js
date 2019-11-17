'use strict';

(function () {

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var PRICE_H = 10000;
  var PRICE_MD = 5000;
  var PRICE_L = 1000;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

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
  var avatarPrv = document.querySelector('.ad-form-header__preview');
  var avatarField = document.querySelector('#avatar');
  var avatarPic = avatarPrv.querySelector('img');
  var submitButton = document.querySelector('.ad-form__submit');

  var defaultX = window.city.startX + (window.util.CONTROL_SIZE / 2);
  var defaultY = window.city.startY + (window.util.CONTROL_SIZE / 2);
  var defaultAddress = null;

  var currentX = defaultX;
  var currentY = defaultY + window.util.CONTROL_SPIKE_HEIGHT;
  var currentAddress = null;

  var writeAddress = function (x, y) {
    return x.toString() + ', ' + y.toString();
  };

  var getCurrentAddress = function () {
    var c = window.city.control;
    var currX = c.offsetLeft;
    var currY = c.offsetTop;
    if (currX < 0) {
      currX = 0;
    };
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
      addrField.setAttribute('readonly', 'readonly');
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
    if (selectedRooms === 100 && selectedGuests !== 0) {
        errMessage = 'Количество гостей не соответствует выбранному количеству комнат';
    }
    if (selectedRooms <= 3 && selectedGuests <= 3) {
      if (selectedGuests > selectedRooms) {
        errMessage = 'Количество гостей не соответствует выбранному количеству комнат';
      }
      if (selectedGuests === 0) {
        errMessage = 'Количество гостей не соответствует выбранному количеству комнат';
      }
    }
    guestsField.setCustomValidity(errMessage);
  };

  var validateTitle = function () {
    var title = titleField.value;
    var errMessage = '';
    if (title.length < MIN_TITLE_LENGTH || title.length > MAX_TITLE_LENGTH) {
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
    } else if (pr < PRICE_H && tp === 'palace') {
      errMessage = 'Минимальная цена на дворец составляет ' + PRICE_H;
    } else if (pr < PRICE_MD && tp === 'house') {
      errMessage = 'Минимальная цена на дом составляет ' + PRICE_MD;
    } else if (pr < PRICE_L && tp === 'flat') {
      errMessage = 'Минимальная цена на квартиру составляет ' + PRICE_L;
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

  var uploadAvatar = function () {
    var file = avatarField.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPic.src = reader.result;
        });
      reader.readAsDataURL(file);
    }
  };

  var cleanFiles = function () {
    avatarPic.src = DEFAULT_AVATAR;
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
  avatarField.addEventListener('change', uploadAvatar);

  window.add = {
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
    avatarPrv: avatarPrv,
    avatarPic: avatarPic,
    avatarField: avatarField,
    getCurrentAddress: getCurrentAddress,
    rewriteAddress: rewriteAddress,
    toggleFormActivate: toggleFormActivate,
    checkGuests: checkGuests,
    validateTitle: validateTitle,
    checkPrice: checkPrice,
    checkTime: checkTime,
    uploadAvatar: uploadAvatar,
    cleanFiles: cleanFiles
  };

})();
