'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');
  var filterSelect = mapFilters.querySelectorAll('select');
  var housingType = document.querySelector('#housing-type');
  var chosenType = housingType.value;
  var housingPrice = document.querySelector('#housing-price');
  var chosenPrice = housingPrice.value;
  var housingRooms = document.querySelector('#housing-rooms');
  var chosenRooms = housingRooms.value;
  var housingGuests = document.querySelector('#housing-guests');
  var chosenGuests = housingGuests.value;
  var housingFeatures = document.querySelector('#housing-features');
  // var filterWifi = housingFeatures.querySelector('#filter-wifi');
  // var filterDishwasher = housingFeatures.querySelector('#filter-dishwasher');
  // var filterParking = housingFeatures.querySelector('#filter-parking');
  // var filterWasher = housingFeatures.querySelector('#filter-washer');
  // var filterElevator = housingFeatures.querySelector('#filter-elevator');
  // var filterConditioner = housingFeatures.querySelector('#conditioner');
  // var chosenFeatures = [filterWifi, filterDishwasher, filterParking, filterWasher, filterElevator, filterConditioner];

  var chosenOptions = [chosenType, chosenPrice, chosenRooms, chosenGuests];

  console.log(chosenOptions);

    // активируем фильтры

 // var activateFilters = function () {
  //  mapFilters.classList.remove('ad-form--disabled');
   // mapFilters.removeAttribute('disabled');
 // };

   var toggleFiltersActivate = function (active) {
    if (active) {
      mapFilters.removeAttribute('disabled');
      filterSelect.forEach(function (item) {
        item.removeAttribute('disabled');
        // item.addEventListener('change', rewritePins(window.offers));
      });
    } else {
      mapFilters.setAttribute('disabled', 'disabled');
      filterSelect.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
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

  // переписываем рендеринг объектов

  var getFilteredOffers = function (allOffers) {
    var result = [];
    for (var i = 0; i < chosenOptions.length; i++) {
      if (chosenOptions[i].value !== 'any') {
        result = filterByParam(allOffers);
      }
    }
    return result;
  };

  var rewritePins = function (allOffers) {
    var res = getFilteredOffers(allOffers);
    window.map.showLocation(res);
  };

  window.filters = {
    mapFilters: mapFilters,
    filterSelect: filterSelect,
    chosenOptions: chosenOptions,
    housingType: housingType,
    housingPrice: housingPrice,
    housingRooms: housingRooms,
    housingGuests: housingGuests,
    housingFeatures: housingFeatures,
    chosenType: chosenType,
    chosenPrice: chosenPrice,
    chosenRooms: chosenRooms,
    chosenGuests: chosenGuests,
    // chosenFeatures: chosenFeatures,
    toggleFiltersActivate: toggleFiltersActivate,
    fitPriceScale: fitPriceScale,
    filterByParam: filterByParam,
    rewritePins: rewritePins
  };

})();
