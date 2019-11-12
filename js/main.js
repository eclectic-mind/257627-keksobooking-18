'use strict';

(function () {

  window.offers = [];
  // window.pins = [];

  var toggleUiActivate = function (active) {
    window.map.toggleMapActivate(active);
    window.form.toggleFormActivate(active);
    window.filters.toggleFiltersActivate(active);
  };

  var onLoad = function (data) {
    window.offers = data;
    // window.map.showLocation(data);
  };

    window.map.control.addEventListener('click', function () {
    toggleUiActivate(true);
    var data = window.offers;
    window.map.showLocation(data);
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

  toggleUiActivate(false);

  window.load.loadData(onLoad, window.error.showError);
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

  window.map.control.addEventListener('mousedown', window.map.dragControl);
  window.map.control.addEventListener('mouseup', window.form.rewriteAddress);

  window.reset.resetButton.addEventListener('click', function () {
    toggleUiActivate(false);
    window.reset.resetAll();
  });

  window.form.adForm.addEventListener('submit', function (evt) {
    window.load.sendData(window.error.showSuccess, window.error.showError);
    evt.preventDefault();
    toggleUiActivate(false);
    window.reset.resetAll();
  });

})();
