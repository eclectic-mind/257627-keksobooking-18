 'use strict';

(function () {

  var jsonToArray = function (data) {
    var objects = [];
    for (var i = 0; i < data.length; i++) {
      objects.push(data[i]);
    }
   console.log(objects);
    return objects;
  };

  window.offers = window.load(jsonToArray, window.DATA_SRC);
  console.log(window.offers);

 })();
