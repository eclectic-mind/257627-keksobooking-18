'use strict';

(function () {

  var AVATAR_SIZE = 40;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var MIN_Y = 130;
  var MAX_Y = 630;

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
      window.cards.showCard(offer);
    });
    pin.appendChild(drawPinImage(offer));
    return pin;
  };

  var showLocation = function (allOffers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < allOffers.length; i++) {
      if (i > 4) {
        break;
      }
      var pin = drawPin(allOffers[i]);
      fragment.appendChild(pin);
      pinsContainer.appendChild(fragment);
    }
  };

  var deletePins = function () {
    var pins = pinsContainer.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }
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
    var tp = window.filters.getFilteredVal(window.filters.housingType);
    var pr = window.filters.getFilteredVal(window.filters.housingPrice);
    var rs = window.filters.getFilteredVal(window.filters.housingRooms);
    var gs = window.filters.getFilteredVal(window.filters.housingGuests);
    var wf = window.filters.getFeature(window.filters.filterWifi);
    var dw = window.filters.getFeature(window.filters.filterDishwasher);
    var pk = window.filters.getFeature(window.filters.filterParking);
    var ws = window.filters.getFeature(window.filters.filterWasher);
    var et = window.filters.getFeature(window.filters.filterElevator);
    var cd = window.filters.getFeature(window.filters.filterConditioner);
    var filteredData = window.offers;
    filteredData = window.filters.filterByParam('type', tp, filteredData);
    filteredData = window.filters.filterByParam('price', pr, filteredData);
    filteredData = window.filters.filterByParam('rooms', rs, filteredData);
    filteredData = window.filters.filterByParam('guests', gs, filteredData);
    filteredData = window.filters.filterByFeat('wifi', wf, filteredData);
    filteredData = window.filters.filterByFeat('dishwasher', dw, filteredData);
    filteredData = window.filters.filterByFeat('parking', pk, filteredData);
    filteredData = window.filters.filterByFeat('washer', ws, filteredData);
    filteredData = window.filters.filterByFeat('elevator', et, filteredData);
    filteredData = window.filters.filterByFeat('conditioner', cd, filteredData);
    window.setTimeout(function () {
      showLocation(filteredData);
    }, 500);
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
        y: checkLimits(moveEvt.clientY, MIN_Y, MAX_Y)
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

  window.map = {
    map: map,
    control: control,
    controlStartCoords: controlStartCoords,
    startX: startX,
    startY: startY,
    toggleMapActivate: toggleMapActivate,
    showLocation: showLocation,
    deletePins: deletePins,
    rewritePins: rewritePins,
    dragControl: dragControl,
    resetControl: resetControl,
    desactivatePin: desactivatePin
  };

})();
