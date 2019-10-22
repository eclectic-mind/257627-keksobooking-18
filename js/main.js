'use strict';

(function() {

  window.offers = [];
  window.pins = [];

  var toggleUiActivate = function (active) {
    window.map.toggleMapActivate(active);
    window.form.toggleFormActivate(active);
    window.filters.toggleFiltersActivate(active);
  }

  // добавляем обработчик на контрольный пин для активации страницы

  window.map.control.addEventListener('click', function () {
    toggleUiActivate(true);
  });

  window.map.control.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      toggleUiActivate(true);
    }
  });

  // изначально неактивный режим

  toggleUiActivate(false);

  // сразу валидируем поля

  window.form.checkGuests();

  // когда всё готово, выводим метки

  // window.load.jsonToArray(window.load.loadData, window.offers);

  window.load.loadData(window.load.jsonToArray, window.error.showError, window.load.DATA_SRC, window.offers);
  console.log(window.offers);

  // window.pins = window.map.showLocation(offers);
  //window.load.loadData(window.map.showLocation, window.error.showError, window.load.DATA_SRC, window.pins);
  //console.log(window.pins);

})();
