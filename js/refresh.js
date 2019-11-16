'use strict';

(function () {

  var resetButton = document.querySelector('.ad-form__reset');

  var resetAll = function () {

    var openedCards = document.getElementsByClassName('popup');
    if (openedCards) {
      window.details.closeCardHandler();
      window.city.desactivatePin();
    }
    window.city.resetControl();
    window.add.adForm.reset();
    window.add.cleanFiles();
    window.sort.mapFilters.reset();
    window.city.deletePins();
  };

  window.refresh = {
    resetButton: resetButton,
    resetAll: resetAll
  };

})();
