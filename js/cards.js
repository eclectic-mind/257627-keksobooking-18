'use strict';

(function () {

  var card = document.querySelector('#card').content.querySelector('article');

  /* var getFeatures = function (object) {
    var data = object.offer.features;
    var list = [];
    for (var i = 0; i < data.length; i++) {
      var elem = card.querySelector('.popup__feature');
      var elemClass = 'popup__feature--' + data[i].toString();
      elem.classList.add(elemClass);
      list.push(elem);
    }
    return list;
  };
  */

  var getPics = function (object) {
    var data = object.offer.photos;
    // console.log(data);
    var container = card.querySelector('.popup__photos');
    var title = object.offer.title;
    var list = [];
    for (var i = 0; i < data.length; i++) {
      var elem = card.getElementsByClassName('popup__photo');
      // console.log(elem);
      elem.src = data[i];
      elem.alt = title;
      list.push(elem);
    }
    // console.log(list);
    container.innerHTML = list;
    return container;
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
    var offerFeatures = card.querySelector('.popup__features');

    // offerFeatures.innerHTML = getFeatures(object);
    var offerDescr = card.querySelector('.popup__description');
    offerDescr.textContent = object.offer.description;
    var offerPics = card.querySelector('.popup__photos');

    var pics = getPics(object);
    offerPics.innerHTML = pics;
    var offerAvatar = card.querySelector('.popup__avatar');
    offerAvatar.src = object.author.avatar;

    card.cloneNode(true);
    fragment.appendChild(card);
    window.map.map.prepend(fragment, window.filtersContainer);
    card.querySelector('.popup__close').addEventListener('click', closeCard);
  };

  // закрытие карточки

  var closeCard = function () {
    document.querySelector('.popup').remove();
    window.map.desactivatePin();
  };

  window.cards = {
    card: card,
    // getFeatures: getFeatures,
    getPics: getPics,
    fitType: fitType,
    showCard: showCard,
    closeCard: closeCard
  };

})();
