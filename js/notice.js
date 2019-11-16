'use strict';

(function () {

  var mainBlock = document.querySelector('main');
  var errorTpl = document.querySelector('#error').content.querySelector('div');
  var successTpl = document.querySelector('#success').content.querySelector('div');

  var closeWindowHandler = function (windowName) {
    var elem = document.querySelector(windowName);
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
  };

  var closeErr = function () {
    var cls = '.error';
    closeWindowHandler(cls);
    removeListeners(closeErr);
  };

  var closeSuc = function () {
    var cls = '.success';
    closeWindowHandler(cls);
    removeListeners(closeSuc);
  };

  var removeListeners = function (func) {
    document.removeEventListener('keydown', func);
    document.removeEventListener('click', func);
  };

  var showError = function (errorMessage) {
    var error = errorTpl.cloneNode(true);
    error.querySelector('p').textContent = errorMessage;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(error);
    mainBlock.prepend(fragment);
    error.querySelector('button').addEventListener('click', closeErr);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        closeErr();
      }
    });
    document.addEventListener('click', closeErr);
  };

  var showSuccess = function () {
    var succ = successTpl.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(succ);
    mainBlock.prepend(fragment);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        closeSuc();
      }
    });
    document.addEventListener('click', closeSuc);
  };

  window.notice = {
    showError: showError,
    showSuccess: showSuccess
  };

})();
