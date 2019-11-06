'use strict';

(function () {

  var mainBlock = document.querySelector('main');
  var errorTpl = document.querySelector('#error').content.querySelector('div');
  var successTpl = document.querySelector('#success').content.querySelector('div');

  // закрытие окна ошибки

  var closeErrorWindow = function (evt) {
    // evt.preventDefault();
    // errorTpl.remove();
    document.querySelector('.error').remove();
  };

  var closeSuccessWindow = function (evt) {
    document.querySelector('.success').remove();
  };

  // обработчик ошибки

  var showError = function (errorMessage) {
    var error = errorTpl.cloneNode(true);
    error.querySelector('p').textContent = errorMessage;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(error);
    mainBlock.prepend(fragment);

    error.querySelector('button').addEventListener('click', closeErrorWindow);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        closeErrorWindow();
      }
    });
    document.addEventListener('click', closeErrorWindow);
  };

  var showSuccess = function () {
    var succ = successTpl.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(succ);
    mainBlock.prepend(fragment);

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        closeSuccessWindow();
      }
    });
    document.addEventListener('click', closeSuccessWindow);
  };

  window.error = {
    showError: showError,
    showSuccess: showSuccess
  }

  })();
