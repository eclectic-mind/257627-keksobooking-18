'use strict';

(function () {

  var card = document.querySelector('#card').content.querySelector('article');

  var showFeatures = function (object) {
    var data = object.offer.features;
    var container = card.querySelector('.popup__features');
    container.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      var elem = document.createElement('li');
      var featureClass = 'popup__feature--' + data[i];
      elem.classList.add('popup__feature');
      elem.classList.add(featureClass);
      container.appendChild(elem);
    }
    return container;
  };

  var showPics = function (object) {
    var data = object.offer.photos;
    var container = card.querySelector('.popup__photos');
    container.innerHTML = '';
    var title = object.offer.title;
    for (var i = 0; i < data.length; i++) {
      var elem = new Image(45, 40);
      elem.src = data[i];
      elem.alt = title;
      elem.classList.add('popup__photo');
      container.appendChild(elem);
    }
    return container;
  };

  var deleteEmpty = function (pics) {
    var elems = pics.querySelectorAll('.popup__photo');
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].alt === 'Фотография жилья') {
        elems[i].remove();
      }
    }
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

  var showCard = function (object) {
    var fragment = document.createDocumentFragment();

    var offerTitle = card.querySelector('.popup__title');
    offerTitle.textContent = object.offer.title;
    var offerAddress = card.querySelector('.popup__text--address');
    offerAddress.textContent = object.offer.address;
    var offerPrice = card.querySelector('.popup__text--price');
    offerPrice.textContent = object.offer.price.toString() + ' ₽/ночь';
    var offerType = card.querySelector('.popup__type');
    offerType.textContent = fitType(object.offer.type);
    var offerCapacity = card.querySelector('.popup__text--capacity');
    offerCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    var offerTimeChecks = card.querySelector('.popup__text--time');
    offerTimeChecks.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    var offerFeatures = showFeatures(object);
    var offerDescr = card.querySelector('.popup__description');
    offerDescr.textContent = object.offer.description;
    var offerPics = showPics(object);
    deleteEmpty(offerPics);
    var offerAvatar = card.querySelector('.popup__avatar');
    offerAvatar.src = object.author.avatar;

    card.cloneNode(true);
    fragment.appendChild(card);
    window.map.map.prepend(fragment, window.filtersContainer);
    card.querySelector('.popup__close').addEventListener('click', closeCard);
  };

  var closeCard = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
      window.map.desactivatePin();
    }
  };

  window.cards = {
    card: card,
    showFeatures: showFeatures,
    showPics: showPics,
    fitType: fitType,
    showCard: showCard,
    closeCard: closeCard
  };

})();
