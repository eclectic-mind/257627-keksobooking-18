'use strict';

(function () {

  var PRICE_LIMIT_LOW = 10000;
  var PRICE_LIMIT_HIGH = 50000;

  var mapFilters = document.querySelector('.map__filters');
  var filterSelects = mapFilters.querySelectorAll('select');

  var housingType = document.querySelector('#housing-type');
  var chosenType = housingType.value;
  var housingPrice = document.querySelector('#housing-price');
  var chosenPrice = housingPrice.value;
  var housingRooms = document.querySelector('#housing-rooms');
  var chosenRooms = housingRooms.value;
  var housingGuests = document.querySelector('#housing-guests');
  var chosenGuests = housingGuests.value;

  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');

  var toggleFiltersActivate = function (active) {
    if (active) {
      mapFilters.removeAttribute('disabled');
      filterSelects.forEach(function (item) {
        item.removeAttribute('disabled');
      });
    } else {
      mapFilters.setAttribute('disabled', 'disabled');
      filterSelects.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
    }
  };

  var getFeature = function (checkbox) {
    if (checkbox.checked) {
      return checkbox.value;
    } else {
      return null;
    }
  };

  var fitPriceScale = function (priceName, value) {
    if ((priceName === 'middle') && (value >= PRICE_LIMIT_LOW && value <= PRICE_LIMIT_HIGH)) {
      return true;
    } else if ((priceName === 'low') && (value < PRICE_LIMIT_LOW)) {
      return true;
    } else if ((priceName === 'high') && (value > PRICE_LIMIT_HIGH)) {
      return true;
    } else {
      return false;
    }
  };

  var filterByParam = function (param, val, data) {
    var filtered = [];
    if (val === 'any') {
      filtered = data;
    }
    if (param === 'rooms' || param === 'guests') {
      val = parseInt(val, 10);
    }

    data.forEach(function (item) {
      var realValue = item.offer[param];
      if (param === 'price') {
        var result = fitPriceScale(val, realValue);
        if (result === true) {
          filtered.push(item);
        }
      } else {
        if (realValue === val) {
          filtered.push(item);
        }
      }
    });
    return filtered;
  };

  var filterByFeat = function (param, val, data) {
    var filtered = [];
    if (val === null) {
      filtered = data;
    }
    data.forEach(function (item) {
      var realValue = item.offer.features;
      var hasFeature = realValue.includes(val);
      if (hasFeature === true) {
        filtered.push(item);
      }
    });
    return filtered;
  };

  var getFilteredVal = function (filter) {
    return filter.value;
  };

  window.sort = {
    PRICE_LIMIT_LOW: PRICE_LIMIT_LOW,
    PRICE_LIMIT_HIGH: PRICE_LIMIT_HIGH,

    mapFilters: mapFilters,
    filterSelects: filterSelects,

    housingType: housingType,
    housingPrice: housingPrice,
    housingRooms: housingRooms,
    housingGuests: housingGuests,

    chosenType: chosenType,
    chosenPrice: chosenPrice,
    chosenRooms: chosenRooms,
    chosenGuests: chosenGuests,

    filterWifi: filterWifi,
    filterDishwasher: filterDishwasher,
    filterParking: filterParking,
    filterWasher: filterWasher,
    filterElevator: filterElevator,
    filterConditioner: filterConditioner,
    toggleFiltersActivate: toggleFiltersActivate,
    fitPriceScale: fitPriceScale,
    filterByParam: filterByParam,
    getFilteredVal: getFilteredVal,
    filterByFeat: filterByFeat,
    getFeature: getFeature
  };

})();
