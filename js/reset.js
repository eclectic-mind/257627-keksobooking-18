'use strict';

(function () {

  var resetButton = document.querySelector('.ad-form__reset');

  var resetAll = function () {

    var openedCards = document.getElementsByClassName('popup');
    if (openedCards) {
      window.cards.closeCard();
      window.map.desactivatePin();
    }
    window.map.resetControl();
    window.form.adForm.reset();
    window.filters.mapFilters.reset();
    window.map.rewritePins();
  };

  window.reset = {
    resetButton: resetButton,
    resetAll: resetAll
  };

})();
