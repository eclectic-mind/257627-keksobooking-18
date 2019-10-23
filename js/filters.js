'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');
  var filterSelects = mapFilters.querySelectorAll('select');
  var checkboxes = document.querySelectorAll('.map__feature');
  // console.log(checkboxes);

  var housingType = document.querySelector('#housing-type');
  var chosenType = housingType.value;
  var housingPrice = document.querySelector('#housing-price');
  var chosenPrice = housingPrice.value;
  var housingRooms = document.querySelector('#housing-rooms');
  var chosenRooms = housingRooms.value;
  var housingGuests = document.querySelector('#housing-guests');
  var chosenGuests = housingGuests.value;

  var housingFeaturesBlock = document.querySelector('#housing-features');

  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');

  // активируем фильтры

  var toggleFiltersActivate = function (active) {
    if (active) {
      mapFilters.removeAttribute('disabled');
      filterSelects.forEach(function (item) {
        item.removeAttribute('disabled');
        // item.addEventListener('change', rewritePins(window.offers));
      });
    } else {
      mapFilters.setAttribute('disabled', 'disabled');
      filterSelects.forEach(function (item) {
        item.setAttribute('disabled', 'disabled');
      });
      };
  }

  // собираем features

  var getFeatures = function (filterWifi, filterDishwasher, filterParking, filterWasher, filterElevator, filterConditioner) {
    var result = [];
    if (filterWifi.checked) {
      result.push(filterWifi.value);
    };
    if (filterDishwasher.checked) {
      result.push(filterDishwasher.value);
    };
    if (filterParking.checked) {
      result.push(filterParking.value);
    };
    if (filterWasher.checked) {
      result.push(filterWasher.value);
    };
    if (filterElevator.checked) {
      result.push(filterElevator.value);
    };
    if (filterConditioner.checked) {
      result.push(filterConditioner.value);
    };
    // console.log(result);
    return result;
  };

 var allFeatures = getFeatures(filterWifi, filterDishwasher, filterParking, filterWasher, filterElevator, filterConditioner);
 console.log(allFeatures);

 // собираем все свойства

  /* var chosenOptions = {
    'type': chosenType,
    'price': chosenPrice,
    'rooms': chosenRooms,
    'guests': chosenGuests,
    'features': allFeatures
  }; */

  var chosenValues = [chosenType, chosenPrice, chosenRooms, chosenGuests, allFeatures];

  console.log(chosenValues);

  // сопоставляем название цены и числовой диапазон

  var fitPriceScale = function (priceName, value) {
    if ((priceName === 'middle') && (value >= 10000 && value <= 50000)) {
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

  // фильтрация объектов

  var filterByParam = function (allOffers, param, val) {

    // allOffers - исходный нефильтрованный массив квартир, param - параметр, по к-рому фильтруем, val - значение параметра, к-рое пришло из фильтра
    // filtered - итоговый отфильтрованный массив, realValue - фактическое значение параметра у каждой квартиры

    var filtered = [];
    if (val === 'any') {
      filtered = allOffers;
    };

  // числовые параметры приводим к числовым значениям
    if (param === 'rooms' || param === 'guests') {
      val = parseInt(val, 10);
    };

  // сравниваем заданное значение с фактическим у каждой квартиры

    for (var i = 0; i < allOffers.length; i++) {
      var realValue = allOffers[i].offer[param];

  // сравниваем цену
      if (param === 'price') {
          // console.log('название цены: ' + val);
          // console.log('фактическое значение: ' + realValue);
          var result = fitPriceScale(val, realValue);
          // console.log('сравнили ' + result);
          if (result === true) {
            filtered.push(allOffers[i]);
          }
      }
  // c features - отдельная история
      if (param === 'features') {
        for (var i = 0; i < param.length; i++) {
          if (realValue.includes(param[i])) {
            filtered.push(allOffers[i]);
             }
            }
        }
  // если сравнение прошло, добавляем элемент в итоговый массив
      else {
        if (realValue === val) {
          filtered.push(allOffers[i]);
       }
     }
    }
    //window.map.showLocation(filtered);
    return filtered;
  };

  var filterByType = function (val) {
    var filtered = [];
    for (var i = 0; i < window.offers.length; i++) {
      var realValue = window.offers[i].offer.type;
        if ((realValue === val) || (val === 'any')) {
          filtered.push(window.offers[i]);
       }
     }
    return filtered;
  };

  var getFilteredVal = function (filter) {
    return filter.value;
  };

 /* var filterListener = function (filter) {
    filter.addEventListener('change', getFilteredData);
  }
*/

  /* var getFilteredData = function (data ) {
    var result = [];

    result = filterByParam(data, param, val);
    return result;
  };
  */

  /* var crossFilter = function (allValues, offers) {
      var filtered = [];
      filtered = filterByParam(window.offers, 'type', allValues[0]);
      filtered = filterByParam(filtered, 'price', allValues[1]);
      filtered = filterByParam(filtered, 'rooms', allValues[2]);
      filtered = filterByParam(filtered, 'guests', allValues[3]);
      // filtered = filterByParam(filtered, 'features', allValues[4]);
      offers = filtered;
    return offers;
  }
*/
  window.filters = {
    mapFilters: mapFilters,
    filterSelects: filterSelects,
    checkboxes: checkboxes,

    housingType: housingType,
    housingPrice: housingPrice,
    housingRooms: housingRooms,
    housingGuests: housingGuests,

    chosenType: chosenType,
    chosenPrice: chosenPrice,
    chosenRooms: chosenRooms,
    chosenGuests: chosenGuests,
    chosenValues: chosenValues,

    toggleFiltersActivate: toggleFiltersActivate,
    fitPriceScale: fitPriceScale,
    filterByParam: filterByParam,
    getFilteredVal: getFilteredVal,
    filterByType: filterByType
    //filterListener: filterListener

    //crossFilter: crossFilter
  };

})();
