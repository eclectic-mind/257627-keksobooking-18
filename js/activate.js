'use strict';

(function () {

  // изначально неактивный режим

  window.globals.map.setAttribute('disabled', 'disabled');
  window.globals.mapFilters.classList.add('ad-form--disabled');
  window.globals.mapFilters.setAttribute('disabled', 'disabled');
  window.globals.filtersSelect.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });
  window.globals.allFieldsets.forEach(function (item) {
    item.setAttribute('disabled', 'disabled');
  });
  window.globals.addrField.value = window.globals.defaultAddress;

  // активируем формы

  window.activateAllForms = function () {
    window.globals.addrField.value = window.globals.currentAddress;
    window.globals.adForm.classList.remove('ad-form--disabled');
    window.globals.adForm.removeAttribute('disabled');
    window.globals.filtersSelect.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    window.globals.allFieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  // активируем карту

  window.activateMap = function () {
    window.globals.map.classList.remove('map--faded');
    window.globals.map.removeAttribute('disabled');
    window.globals.mapFilters.classList.remove('ad-form--disabled');
    window.globals.mapFilters.removeAttribute('disabled');
  };

  // добавляем обработчик на контрольный пин для активации страницы

  window.globals.control.addEventListener('mousedown', window.activateAllForms);
  window.globals.control.addEventListener('mousedown', window.activateMap);
  window.globals.control.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.activateAllForms();
      window.activateMap();
    }
  });
})();
