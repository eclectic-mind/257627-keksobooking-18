'use strict';

(function () {

  var AVATAR_SIZE = 40;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PINS_VISIBLE = 5;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var FILTER_TIMEOUT = 500;

  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var control = document.querySelector('.map__pin--main');

  var minX = (innerWidth - map.offsetWidth) / 2;
  var maxX = (map.offsetWidth + minX) - (PIN_WIDTH / 2);

  var controlStartCoords = control.getBoundingClientRect();
  var startX = controlStartCoords.left;
  var startY = controlStartCoords.top + window.scrollY;

  var toggleMapActivate = function (active) {
    if (active) {
      map.classList.remove('map--faded');
      map.removeAttribute('disabled');
    } else {
      map.classList.add('map--faded');
      map.setAttribute('disabled', 'disabled');
    }
  };

  var drawPinImage = function (offer) {
    var pinPic = document.createElement('img');
    pinPic.src = offer.author.avatar;
    pinPic.alt = offer.offer.title;
    pinPic.style.width = AVATAR_SIZE + 'px';
    pinPic.style.height = AVATAR_SIZE + 'px';
    pinPic.setAttribute('draggable', false);
    return pinPic;
  };

  var drawPin = function (offer) {
    var pin = document.createElement('button');
    pin.className = 'map__pin';
    pin.setAttribute('type', 'button');

    var pinX = offer.location.x - (PIN_WIDTH / 2);
    var pinY = offer.location.y - PIN_HEIGHT;
    pin.style.left = pinX + 'px';
    pin.style.top = pinY + 'px';

    pin.addEventListener('click', function () {
      var selected = document.querySelectorAll('.map__pin--active');
      if (selected.length > 0) {
        desactivatePin();
      }
      pin.classList.add('map__pin--active');
      window.details.showCard(offer);
    });
    pin.appendChild(drawPinImage(offer));
    return pin;
  };

  var addPinToMap = function (elem) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(elem);
    pinsContainer.appendChild(fragment);
    return pinsContainer;
  };

  var showLocation = function (allOffers) {
    var items = allOffers;
    items.forEach(function (item, index) {
      var pin = drawPin(items[index]);
      addPinToMap(pin);
      if (index >= PINS_VISIBLE) {
        pin.remove();
      }
    });
  };

  var deletePins = function () {
    var pins = pinsContainer.querySelectorAll('.map__pin');
    pins.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    pinsContainer.appendChild(control);
    return pinsContainer;
  };

  var desactivatePin = function () {
    var pinClass = 'map__pin--active';
    var pin = document.getElementsByClassName(pinClass)[0];
    if (pin) {
      pin.classList.remove(pinClass);
    }
  };

  var rewritePins = function () {
    deletePins();
    window.details.closeCardHandler();
    var tp = window.sort.getFilteredVal(window.sort.housingType);
    var pr = window.sort.getFilteredVal(window.sort.housingPrice);
    var rs = window.sort.getFilteredVal(window.sort.housingRooms);
    var gs = window.sort.getFilteredVal(window.sort.housingGuests);
    var wf = window.sort.getFeature(window.sort.filterWifi);
    var dw = window.sort.getFeature(window.sort.filterDishwasher);
    var pk = window.sort.getFeature(window.sort.filterParking);
    var ws = window.sort.getFeature(window.sort.filterWasher);
    var et = window.sort.getFeature(window.sort.filterElevator);
    var cd = window.sort.getFeature(window.sort.filterConditioner);
    var filteredData = window.offers;
    filteredData = window.sort.filterByParam('type', tp, filteredData);
    filteredData = window.sort.filterByParam('price', pr, filteredData);
    filteredData = window.sort.filterByParam('rooms', rs, filteredData);
    filteredData = window.sort.filterByParam('guests', gs, filteredData);
    filteredData = window.sort.filterByFeat('wifi', wf, filteredData);
    filteredData = window.sort.filterByFeat('dishwasher', dw, filteredData);
    filteredData = window.sort.filterByFeat('parking', pk, filteredData);
    filteredData = window.sort.filterByFeat('washer', ws, filteredData);
    filteredData = window.sort.filterByFeat('elevator', et, filteredData);
    filteredData = window.sort.filterByFeat('conditioner', cd, filteredData);
    window.setTimeout(function () {
      showLocation(filteredData);
    }, FILTER_TIMEOUT);
  };

  var checkLimits = function (coord, min, max) {
    if (coord < min) {
      coord = min;
    }
    if (coord > max) {
      coord = max;
    }
    return coord;
  };

  var checkLimitsY = function (coord, min, max) {
    if (window.pageYOffset > 0) {
      min -= pageYOffset;
      max -= pageYOffset;
    }
    return checkLimits(coord, min, max);
  };

  var dragControl = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var finishCoords = {
        x: checkLimits(moveEvt.clientX, minX, maxX),
        y: checkLimitsY(moveEvt.clientY, MIN_Y, MAX_Y)
      };
      var shift = {
        x: startCoords.x - finishCoords.x,
        y: startCoords.y - finishCoords.y
      };
      startCoords = {
        x: finishCoords.x,
        y: finishCoords.y
      };
      control.style.top = (control.offsetTop - shift.y) + 'px';
      control.style.left = (control.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var resetControl = function () {
    control.style.left = startX + 'px';
    control.style.top = startY + 'px';
  };

  window.city = {
    FILTER_TIMEOUT: FILTER_TIMEOUT,
    map: map,
    control: control,
    controlStartCoords: controlStartCoords,
    minX: minX,
    maxX: maxX,
    startX: startX,
    startY: startY,
    checkLimits: checkLimits,
    toggleMapActivate: toggleMapActivate,
    showLocation: showLocation,
    deletePins: deletePins,
    rewritePins: rewritePins,
    dragControl: dragControl,
    resetControl: resetControl,
    desactivatePin: desactivatePin
  };

})();
