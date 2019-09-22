
// создаём блок map, убираем класс

var maxMapWidth = map.offsetWidth;

var map = document.querySelector('.map');
map.classList.remove('.map--faded');

// случайное число из диапазона

var makeOneRandomOfRange = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
	};

// случайный элемент из нескольких имеющихся

var makeOneRandom = function () {
	var as = [];
    for (var i = 0; i < arguments.length; i++) {
  	  as[i] = arguments[i];
    }
	var rNum = makeOneRandomOfRange(0, as.length);
	return as[rNum]; 
	};

// случайная картинка

var getRandomImg = function (min, max) {
	var rNum = makeOneRandomOfRange(min, max);
	return 'img/avatars/user/0' + num + '.png';
}

// массив со случайной сортировкой из скольки угодно имеющихся элементов

var makeRandomArr = function () {
	var as = [];
    for (var i = 0; i < arguments.length; i++) {
  	  as[i] = arguments[i];
    }
	var s = as.sort(func);
	function func(a, b) {
  	return 0.5 - Math.random();
	} 
	return s;
}


// генерируем объект-объявление

var makeObject = function () {
author: {
	avatar: getRandomImg (1, 8)
}
offer: {
	title: makeOneRandom('Offer 1', 'Offer 2', 'Offer 3', 'Offer 4', 'Offer 5', 'Offer 6', 'Offer 7', 'Offer 8'),
	address: makeOneRandomOfRange(0, maxMapWidth) + ', ' + makeOneRandomOfRange(130, 630),
    price: makeOneRandom(1000, 1486, 2355, 2798, 3461, 4862, 6622, 8163),
    type: makeOneRandom('palace', 'flat', 'house', 'bungalo'),
    rooms: makeOneRandomOfRange(1, 6),
    guests: makeOneRandomOfRange(1, 20),
    checkin: makeOneRandom('12:00', '13:00', '14:00'),
    checkout: makeOneRandom('12:00', '13:00', '14:00'),
    features: makeRandomArr('wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'),
    description: makeOneRandom('descrpition 1', 'descrpition 2', 'descrpition 3', 'descrpition 4', 'descrpition 5', 'descrpition 6', 'descrpition 7', 'descrpition 8'),
    photos: makeRandomArr('http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg')
},
location: {
	x: makeOneRandomOfRange(0, maxMapWidth),
	y: makeOneRandomOfRange(130, 630)
}
};

//собираем массив из 8-ми таких объектов

var makeObjectsArray = function () {
var arr = [];
for (var i = 0; i <= 8; i++) {
		playersArray[i] = makeObject();
	}
	return arr;
}

makeObjectsArray();

// создаём dom-элементы, соответствующие меткам на карте

var pin = document.createElement('div');
pin.className = 'map__pin';

var pinX = location.x - 50;
var pinY = location.y - 82;

pin.style.left = pinX + 'px'
pin.style.top = pinY + 'px'
pin.style.src = author.avatar;
pin.style.alt = offer.title;

// отрисовываем созданные dom-элементы

var fragment = document.createDocumentFragment();
fragment.appendChild(pin);
