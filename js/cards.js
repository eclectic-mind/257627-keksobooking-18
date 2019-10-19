'use strict';

(function () {

  var cardTpl = document.querySelector('#card').content.querySelector('article');

  var showCard = function (object) {
    var fragment = document.createDocumentFragment();

  var offerTitle = cardTpl.querySelector('.popup__title');
  offerTitle.textContent = object.offer.title;
  var offerAddress = cardTpl.querySelector('.popup__text--address');
  offerAddress.textContent = object.offer.address;
  var offerPrice = cardTpl.querySelector('.popup__text--price');
  offerPrice.textContent = object.offer.price.toString() + '₽/ночь';
  var offerType = cardTpl.querySelector('.offer.type');
  var typeRus = fitType(object.offer.type);
  offerType.textContent = typeRus;
  var offerCapacity = cardTpl.querySelector('.popup__text--capacity');
  offerCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests +' гостей';
  var offerTimeChecks = cardTpl.querySelector('.popup__text--time');
  offerTimeChecks.textContent = 'Заезд после ' + object.offer.checkin +', выезд до ' + object.offer.checkout;
  var offerFeatures = cardTpl.querySelector('.popup__features');
  var featuresList = showFeatures(object);
  offerFeatures.innerHTML = featuresList;
  var offerDescr = cardTpl.querySelector('.popup__description');
  offerDescr.textContent = object.offer.description;
  var offerPics = cardTpl.querySelector('.popup__photos');
  var picsList = showPics(object);
  offerPics.innerHTML = picsList;
  var offerAvatar = cardTpl.querySelector('.popup__avatar');
  offerAvatar.src = object.author.avatar;

    cardTpl.cloneNode(true);
    fragment.appendChild(cardTpl);
    window.map.insertBefore(fragment, window.filtersContainer);
    }
    return window.map;
  };

  var showFeatures = function (object) {
    var data = object.offer.features;
    var list = [];
    for (var i = 0; i < data.length; i++) {
      var elem = cardTpl.querySelector('.popup__feature');
      var elemClass = 'popup__feature--' + data[i].toString();
      elem.classList.add(elemClass);
      list.push(elem);
    }
    return list;
  };

  var showPics = function (object) {
    var data = object.offer.photos;
    var title = object.offer.title;
    var list = [];
    for (var i = 0; i < data.length; i++) {
      var elem = cardTpl.querySelector('.popup__photo');
      var elem.src = data[i];
      var elem.alt = title;
      list.push(elem);
    }
    return list;
  };

  var fitType = function (objType) {
    var rus = '';
    switch (objType) {
      case 'flat':
        rus = 'Квартира';
        break;
      case 'bungalo':
        rus = 'Бунгало';
        break;
      case 'house':
        rus = 'Дом';
        break;
      case 'palace':
        rus = 'Дворец';
        break;
    }
    return rus;
  };


})();
