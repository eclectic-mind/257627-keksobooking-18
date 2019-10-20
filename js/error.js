 'use strict';

(function () {

  var mainBlock = document.querySelector('main');
  var errorTpl = document.querySelector('#error').content.querySelector('div');

  // закрытие окна ошибки

  var closeErrorWindow = function (evt) {
    // evt.preventDefault();
    // errorTpl.remove();
    document.querySelector('.error').remove();
  };

  // обработчик ошибки

  var showError = function (errorMessage) {
    var error = errorTpl.cloneNode(true);
    error.querySelector('p').textContent = errorMessage;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(error);
    mainBlock.prepend(fragment);
    error.querySelector('button').addEventListener('click', closeErrorWindow);
  };

  window.error = {
    showError: showError
  }

  })();
