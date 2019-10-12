'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var roomsField = document.querySelector('#room_number');
  var guestsField = document.querySelector('#capacity');
  var filtersSelect = document.querySelectorAll('.map__filter');
  var addrField = document.querySelector('#address');
  var allFieldsets = document.querySelectorAll('fieldset');

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

  // изначально неактивный режим

  filtersSelect.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });
  allFieldsets.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });
  addrField.value = defaultAddress;

  // активируем формы

  var activateAllForms = function () {
    addrField.value = currentAddress;
    adForm.classList.remove('ad-form--disabled');
    adForm.removeAttribute('disabled');
    filtersSelect.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    allFieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  // добавляем обработчик на контрольный пин для активации страницы

  window.control.addEventListener('mousedown', activateAllForms);
  window.control.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activateAllForms();
    }
  });

  // валидация гостей/комнат

  var checkGuests = function () {
    var selectedRooms = parseInt(roomsField.value, 10);
    var selectedGuests = parseInt(guestsField.value, 10);
    var errMsg = '';
    if (selectedGuests > selectedRooms || (selectedRooms === 100 && selectedGuests !== 0)) {
      errMsg = 'Количество гостей не соответствует выбранному количеству комнат';
    }
    guestsField.setCustomValidity(errMsg);
  };

  // проверяем, не слишком ли много гостей

  roomsField.addEventListener('change', checkGuests);
  guestsField.addEventListener('change', checkGuests);

  checkGuests();

})();
