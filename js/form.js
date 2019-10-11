'use strict';

(function () {

// валидация гостей/комнат

  window.checkGuests = function () {
    var selectedRooms = parseInt(window.globals.roomsField.value, 10);
    var selectedGuests = parseInt(window.globals.guestsField.value, 10);
    var errMsg = '';
    if (selectedGuests > selectedRooms || (selectedRooms === 100 && selectedGuests !== 0)) {
      errMsg = 'Количество гостей не соответствует выбранному количеству комнат';
    }
    window.globals.guestsField.setCustomValidity(errMsg);
  };

  // проверяем, не слишком ли много гостей

  window.globals.roomsField.addEventListener('change', checkGuests);
  window.globals.guestsField.addEventListener('change', checkGuests);

  window.checkGuests();

})();
