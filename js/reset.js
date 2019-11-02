'use strict';

(function () {

  var resetButton = document.querySelector('.ad-form__reset');

  var resetAll = function () {
    
    var openedCards = document.querySelectorAll('.popup');
    if (openedCards) {
      window.cards.closeCard();
      window.map.desactivatePin();
    };
    
    window.form.adForm.reset();
    window.filters.mapFilters.reset();
    console.log('ресет!');
  };

  window.reset = {
    resetButton: resetButton,
    resetAll: resetAll
  };

})();