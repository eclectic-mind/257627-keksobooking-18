// случайное число из диапазона

var getRandomInRange = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// случайный элемент из нескольких имеющихся

var chooseRandom = function (arr) {
  return arr[getRandomInRange(0, arr.length)];
};

// случайная картинка

var getRandomImg = function (min, max) {
	var rNum = getRandomInRange(min, max);
	return 'img/avatars/user/0' + num + '.png';
};

// массив со случайной сортировкой из скольки угодно имеющихся элементов

var randomSort = function () {
	var arr = [];
    for (var i = 0; i < arguments.length; i++) {
  	  arr[i] = arguments[i];
    };
	var sorted = arr.sort(func);
	function func(a, b) {
  	return 0.5 - Math.random();
	};
	return sorted;
};

/* новая версия - не работает
var randomSort = function (arr) {
  var sortFunc = function (a, b) {
    return 0.5 - Math.random();
  };
  return arr.sort(sortFunc);
};
*/

// все переменные, которые потребуются для объявления

var titles = ['Offer 1', 'Offer 2', 'Offer 3', 'Offer 4', 'Offer 5', 'Offer 6', 'Offer 7', 'Offer 8'];
var descriptions = ['descrpition 1', 'descrpition 2', 'descrpition 3', 'descrpition 4', 'descrpition 5', 'descrpition 6', 'descrpition 7', 'descrpition 8'];
var timechecks = ['12:00', '13:00', '14:00'];
var houses = ['palace', 'flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var pics = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// генерируем объект-объявление

var generateOffer= function () {
author: {
	avatar: getRandomImg(1, 8)
},
offer: {
	title: chooseRandom(titles),
	address: getRandomInRange(0, actualMapWidth) + ', ' + getRandomInRange(130, 630),
  price: getRandomInRange(1500, 8000),
  type: chooseRandom(houses),
  rooms: getRandomInRange(1, 6),
  guests: getRandomInRange(1, 20),
  checkin: chooseRandom(timechecks),
  checkout: chooseRandom(timechecks),
  features: randomSort(features),
  description: chooseRandom(descriptions),
	photos: randomSort(pics)
},
location: {
	x: getRandomInRange(0, actualMapWidth),
	y: getRandomInRange(130, 630)
}
};

//собираем массив из 8-ми таких объектов

var generateOffersArray = function (n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push(generateOffer());
  }
  return result;
}ж

// создаём блок map, убираем класс

var map = document.querySelector('.map');
map.classList.remove('.map--faded');

var actualMapWidth = map.offsetWidth;

// создаём dom-элементы меток и отрисовываем их

var showLocation = function () {
	var pin = document.createElement('div');
	pin.className = 'map__pin';
	var pinX = location.x - 50;
	var pinY = location.y - 82;
	pin.style.left = pinX + 'px'
	pin.style.top = pinY + 'px'
	pin.style.src = author.avatar;
	pin.style.alt = offer.title;
	var fragment = document.createDocumentFragment();
	fragment.appendChild(pin);
};
