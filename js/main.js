'use strict';

(function() {

  window.offers = [];
  // window.pins = [];

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

  var onLoad = function (data) {
    window.offers = data;
    window.map.showLocation(data);
  };

  // изначально неактивный режим

  toggleUiActivate(false);

  // сразу валидируем поля
  window.form.checkGuests();

  // когда всё готово, выводим метки

  window.load.loadData(onLoad, window.error.showError);

  // подключаем обработчики фильтров

  window.filters.housingType.addEventListener('change', window.map.rewritePins);

})();
