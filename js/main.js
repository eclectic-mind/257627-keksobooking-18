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

  var controlClickHandler = function () {
    toggleUiActivate(true);
    var data = window.offers;
    window.city.showLocation(data);
  };

  var controlKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      toggleUiActivate(true);
    }
  };

  var docKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.details.closeCardHandler();
    }
  };

  var resetClickHandler = function () {
    toggleUiActivate(false);
    window.refresh.resetAll();
  };

  var submitClickHandler = function () {
    window.add.checkGuests();
    window.add.validateTitle();
    window.add.checkPrice();
    window.add.checkTime();
  };

  var formSubmitHandler = function (evt) {
    window.data.loadToServer(window.notice.showSuccess, window.notice.showError);
    evt.preventDefault();
    toggleUiActivate(false);
    window.refresh.resetAll();
  };

  window.city.control.addEventListener('click', controlClickHandler);
  window.city.control.addEventListener('keydown', controlKeydownHandler);

  document.addEventListener('keydown', docKeydownHandler);

  toggleUiActivate(false);

  window.data.loadFromServer(onLoad, window.notice.showError);
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

  window.refresh.resetButton.addEventListener('click', resetClickHandler);

  window.add.submitButton.addEventListener('click', submitClickHandler);
  window.add.adForm.addEventListener('submit', formSubmitHandler);

})();
