'use strict';

(function () {

  var mainBlock = document.querySelector('main');
  var errorTpl = document.querySelector('#error').content.querySelector('div');
  var successTpl = document.querySelector('#success').content.querySelector('div');

  var closeErrorWindowHandler = function () {
    var err = document.querySelector('.error');
    if (err) {
      err.remove();
    }
  };

  var closeSuccessWindowHandlerHandler = function () {
    var suc = document.querySelector('.success');
    if (suc) {
      suc.remove();
    }
  };

  var showError = function (errorMessage) {
    var error = errorTpl.cloneNode(true);
    error.querySelector('p').textContent = errorMessage;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(error);
    mainBlock.prepend(fragment);
    error.querySelector('button').addEventListener('click', closeErrorWindowHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        closeErrorWindowHandler();
      }
    });
    document.addEventListener('click', closeErrorWindowHandler);
  };

  var showSuccess = function () {
    var succ = successTpl.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(succ);
    mainBlock.prepend(fragment);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        closeSuccessWindowHandler();
      }
    });
    document.addEventListener('click', closeSuccessWindowHandler);
  };

  window.error = {
    showError: showError,
    showSuccess: showSuccess
  };

})();
