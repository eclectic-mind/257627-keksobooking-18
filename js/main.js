'use strict';

(function () {

  window.offers = [];
  // window.pins = [];

  var toggleUiActivate = function (active) {
    window.map.toggleMapActivate(active);
    window.form.toggleFormActivate(active);
    window.filters.toggleFiltersActivate(active);
  };

  // добавляем обработчик на контрольный пин для активации страницы

  window.map.control.addEventListener('click', function () {
    toggleUiActivate(true);
  });

  window.map.control.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      toggleUiActivate(true);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.cards.closeCard();
    }
  });

  var onLoad = function (data) {
    window.offers = data;
    window.map.showLocation(data);
  };

  // изначально неактивный режим

  toggleUiActivate(false);

  // сразу валидируем поля
  // window.form.checkGuests();

  // когда всё готово, выводим метки

  window.load.loadData(onLoad, window.error.showError);

  // подключаем обработчики фильтров

  window.filters.housingType.addEventListener('change', window.map.rewritePins);
  window.filters.housingPrice.addEventListener('change', window.map.rewritePins);
  window.filters.housingRooms.addEventListener('change', window.map.rewritePins);
  window.filters.housingGuests.addEventListener('change', window.map.rewritePins);

  window.filters.filterWifi.addEventListener('change', window.map.rewritePins);
  window.filters.filterDishwasher.addEventListener('change', window.map.rewritePins);
  window.filters.filterParking.addEventListener('change', window.map.rewritePins);
  window.filters.filterWasher.addEventListener('change', window.map.rewritePins);
  window.filters.filterElevator.addEventListener('change', window.map.rewritePins);
  window.filters.filterConditioner.addEventListener('change', window.map.rewritePins);

  // ресет

  window.map.control.addEventListener('mousedown', window.map.dragControl);
  window.map.control.addEventListener('mouseup', window.form.rewriteAddress);

  window.reset.resetButton.addEventListener('click', function () {
    toggleUiActivate(false);
    window.reset.resetAll();
  });

  // отправка заполненной формы на сервер

  window.form.adForm.addEventListener('submit', function (evt) {
    // console.log('нажат сабмит!');
    window.load.sendData(window.error.showSuccess, window.error.showError);
    evt.preventDefault();
    toggleUiActivate(false);
    window.reset.resetAll();
  });

})();
