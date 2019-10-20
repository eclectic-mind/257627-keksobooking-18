'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var allFieldsets = document.querySelectorAll('fieldset');
  var roomsField = document.querySelector('#room_number');
  var guestsField = document.querySelector('#capacity');
  var addrField = document.querySelector('#address');

  // выводим адрес по умолчанию

  var defaultX = window.util.CONTROL_SIZE / 2;
  var defaultY = window.util.CONTROL_SIZE / 2;
  var defaultAddress = null;

  // вывод актуального адреса контрольного пина - будет дописано позже в соответствии с ТЗ,
  // когда мы начнём двигать этот пин и пересчитывать его координаты, а пока так

  var currentX = defaultX;
  var currentY = defaultY + window.util.CONTROL_SPIKE_HEIGHT;
  var currentAddress = null;

  // генерируем строку адреса

  var writeAddress = function (x, y) {
    return x.toString() + ', ' + y.toString();
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
      addrField.value = '';
      adForm.classList.add('ad-form--disabled');
      adForm.setAttribute('disabled', 'disabled');
      allFieldsets.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
    }
  }

  // проверяем, не слишком ли много гостей
  // roomsField.addEventListener('change', checkGuests);
  // guestsField.addEventListener('change', checkGuests);
  // checkGuests();

  // валидация гостей/комнат

  var checkGuests = function () {
    var selectedRooms = parseInt(roomsField.value, 10);
    var selectedGuests = parseInt(guestsField.value, 10);
    var errMessage = '';
    if (selectedGuests > selectedRooms || (selectedRooms === 100 && selectedGuests !== 0)) {
      errMessage = 'Количество гостей не соответствует выбранному количеству комнат';
    }
    guestsField.setCustomValidity(errMessage);
  };

  defaultAddress = writeAddress(defaultX, defaultY);
  currentAddress = writeAddress(currentX, currentY);
  addrField.value = defaultAddress;

  window.form = {
    roomsField: roomsField,
    guestsField: guestsField,
    toggleFormActivate: toggleFormActivate,
    checkGuests: checkGuests
  };

})();
