'use strict';

(function () {

    // активируем фильтры

 // var activateFilters = function () {
  //  mapFilters.classList.remove('ad-form--disabled');
   // mapFilters.removeAttribute('disabled');
 // };

   var toggleFiltersActivate = function (active) {
    if (active) {
      window.map.mapFilters.classList.remove('ad-form--disabled');
      window.map.mapFilters.removeAttribute('disabled');
    } else {
      window.map.mapFilters.classList.add('ad-form--disabled');
      window.map.mapFilters.setAttribute('disabled');
      };
  }


  // фильтрация объектов

  var fitPriceScale = function (priceName, value) {
if ((priceName === 'middle') && (value >= 10000 && value < 50000)) {
  return true;
  }
  else if ((priceName === 'low') && (value < 10000)) {
    return true;
  }
  else if ((priceName === 'high') && (value > 50000)) {
    return true;
  }
  else return false;
};

  var filterByParam = function (allOffers, param, val) {
    // console.log('название цены____: ' + val);
    var filtered = [];

    if (param === 'rooms' || param === 'guests') {
      val = parseInt(val, 10);
    };

    for (var i = 0; i < allOffers.length; i++) {
      var condition = allOffers[i].offer[param];

      if (param === 'price') {
          // console.log('название цены: ' + val);
          // console.log('фактическое значение: ' + condition);
          var result = fitPriceScale(val, condition);
          console.log('сравнили ' + result);
          if (result === true) {
            filtered.push(allOffers[i]);
          }
      }

      else if (param === 'features') {
        if (condition.includes(val)) {
          filtered.push(allOffers[i]);
        }
      }

      else {
        if (condition === val) {
          filtered.push(allOffers[i]);
       }
     }
    }
    return filtered;
  };


  // добавляем обработчик на контрольный пин для активации фильтров

  //window.map.control.addEventListener('mousedown', activateFilters);
 // window.map.control.addEventListener('keydown', function (evt) {
  //  if (evt.keyCode === window.util.ENTER_KEYCODE) {
  //    activateFilters();
 //   }
 // });

  window.filters = {
    toggleFiltersActivate: toggleFiltersActivate
  };

})();
