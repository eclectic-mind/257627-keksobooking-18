'use strict';

(function () {

  window.offers = [];

  var toggleUiActivate = function (active) {
    window.city.toggleMapActivate(active);
    window.add.toggleFormActivate(active);
    window.sort.toggleFiltersActivate(active);
  };

  var onLoad = function (data) {
    window.offers = data;
  };

  window.city.control.addEventListener('click', function () {
    toggleUiActivate(true);
    var data = window.offers;
    window.city.showLocation(data);
  });

  window.city.control.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      toggleUiActivate(true);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.details.closeCardHandler();
    }
  });

  toggleUiActivate(false);

  window.data.upload(onLoad, window.notice.showError);
  window.sort.housingType.addEventListener('change', window.city.rewritePins);
  window.sort.housingPrice.addEventListener('change', window.city.rewritePins);
  window.sort.housingRooms.addEventListener('change', window.city.rewritePins);
  window.sort.housingGuests.addEventListener('change', window.city.rewritePins);
  window.sort.filterWifi.addEventListener('change', window.city.rewritePins);
  window.sort.filterDishwasher.addEventListener('change', window.city.rewritePins);
  window.sort.filterParking.addEventListener('change', window.city.rewritePins);
  window.sort.filterWasher.addEventListener('change', window.city.rewritePins);
  window.sort.filterElevator.addEventListener('change', window.city.rewritePins);
  window.sort.filterConditioner.addEventListener('change', window.city.rewritePins);

  window.city.control.addEventListener('mousedown', window.city.dragControl);
  window.city.control.addEventListener('mouseup', window.add.rewriteAddress);

  window.refresh.resetButton.addEventListener('click', function () {
    toggleUiActivate(false);
    window.refresh.resetAll();
  });

  window.add.submitButton.addEventListener('click', function () {
    window.add.checkGuests();
    window.add.validateTitle();
    window.add.checkPrice();
    window.add.checkTime();
  });

  window.add.adForm.addEventListener('submit', function (evt) {
    window.data.sendToServer(window.notice.showSuccess, window.notice.showError);
    evt.preventDefault();
    toggleUiActivate(false);
    window.refresh.resetAll();
  });

})();
