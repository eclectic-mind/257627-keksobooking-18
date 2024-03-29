'use strict';

(function () {

  var DEFAULT_ALT = 'Фотография жилья';
  var PIC_WIDTH = 45;
  var PIC_HEIGHT = 40;

  var card = document.querySelector('#card').content.querySelector('article');

  var showFeatures = function (object) {
    var data = object.offer.features;
    var container = card.querySelector('.popup__features');
    container.innerHTML = '';
    data.forEach(function (item) {
      var elem = document.createElement('li');
      var featureClass = 'popup__feature--' + item;
      elem.classList.add('popup__feature');
      elem.classList.add(featureClass);
      container.appendChild(elem);
    });
    return container;
  };

  var showPics = function (object) {
    var data = object.offer.photos;
    var container = card.querySelector('.popup__photos');
    container.innerHTML = '';
    var title = object.offer.title;
    data.forEach(function (item) {
      var elem = new Image(PIC_WIDTH, PIC_HEIGHT);
      elem.src = item;
      elem.alt = title;
      elem.classList.add('popup__photo');
      container.appendChild(elem);
    });
    return container;
  };

  var deleteEmpty = function (pics) {
    var elems = pics.querySelectorAll('.popup__photo');
    elems.forEach(function (item) {
      if (item.alt === DEFAULT_ALT) {
        item.remove();
      }
    });
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
    showFeatures(object);
    var offerDescr = card.querySelector('.popup__description');
    offerDescr.textContent = object.offer.description;
    var offerPics = showPics(object);
    deleteEmpty(offerPics);
    var offerAvatar = card.querySelector('.popup__avatar');
    offerAvatar.src = object.author.avatar;

    card.cloneNode(true);
    fragment.appendChild(card);
    window.city.map.prepend(fragment, window.filtersContainer);
    card.querySelector('.popup__close').addEventListener('click', closeCardHandler);
  };

  var closeCardHandler = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
      window.city.desactivatePin();
      document.removeEventListener('keydown', closeCardHandler);
    }
  };

  window.details = {
    PIC_WIDTH: PIC_WIDTH,
    PIC_HEIGHT: PIC_HEIGHT,
    DEFAULT_ALT: DEFAULT_ALT,

    card: card,
    showFeatures: showFeatures,
    showPics: showPics,
    fitType: fitType,
    showCard: showCard,
    closeCardHandler: closeCardHandler
  };

})();
