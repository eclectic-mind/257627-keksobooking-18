// генерируем случайную картинку

var getRandomImg = function (min, max) {
	var num = Math.floor(Math.random() * (max - min + 1)) + min;
	return 'img/avatars/user/0' + num + '.png';
}

// генерируем случайное местоположение 

var makeRandomLocX = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

var makeRandomLocY = function () {
	return y = Math.floor(Math.random() * (630 - 130 + 1)) + 130;
};

// генерируем массив со случайной сортировкой из скольки угодно имеющихся элементов

var makeRandomElements = function () {
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

var makeObject = function (title, price, type, rooms, guests, checkin, checkout, features, description, photos, blockXmax, blockXmin) {
author: {
	avatar: getRandomImg (1, 8)
}
offer: {
	title: '',
	address: makeRandomLocX(blockXmax, blockXmin) + ', ' + makeRandomLocY(),
    price: price,
    type: type,
    rooms: rooms,
    guests: guests,
    checkin: checkin,
    checkout: checkout,
    features: makeRandomElements('wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'),
    description: description,
    photos: makeRandomElements('http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg')
},
location: {
	x: makeRandomLocX(blockXmax, blockXmin),
	y: makeRandomLocY()
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

// показываем блок map

// создаём dom-элементы, соответствующие меткам на карте

// отрисовывыем созданные dom-элементы
