'use strict';

(function () {
  // Выбор способа оплаты

  var toggleCash = document.querySelector(window.data.classConst.PAYMENT_CASH);
  var toggleCard = document.querySelector(window.data.classConst.PAYMENT_CARD);
  var paymentByCash = document.querySelector(window.data.classConst.PAYMENT_CASH_WRAP);
  var paymentByCard = document.querySelector(window.data.classConst.PAYMENT_CARD_WRAP);
  var cardInputs = paymentByCard.querySelectorAll(window.data.classConst.TEXT_INPUT);

  toggleCash.addEventListener('change', function () {
    if (toggleCash.checked) {
      paymentByCard.classList.add(window.data.classConst.VISUALLY_HIDDEN);
      paymentByCash.classList.remove(window.data.classConst.VISUALLY_HIDDEN);
      cardInputs.forEach(function (element) {
        element.disabled = true;
      });
    }
  });

  toggleCard.addEventListener('change', function () {
    if (toggleCard.checked) {
      paymentByCash.classList.add(window.data.classConst.VISUALLY_HIDDEN);
      paymentByCard.classList.remove(window.data.classConst.VISUALLY_HIDDEN);
      cardInputs.forEach(function (element) {
        element.disabled = false;
      });
    }
  });

  // Выбор способа доставки

  var toggleDeliverStore = document.querySelector('#deliver__store');
  var toggleDeliverCourier = document.querySelector('#deliver__courier');
  var deliverStore = document.querySelector(window.data.classConst.DELIVER_STORE);
  var deliverCourier = document.querySelector(window.data.classConst.DELIVER_COURIER);
  var deliverStoreInputs = deliverStore.querySelectorAll(window.data.classConst.BTN_INPUT);
  var deliverCourierInputs = deliverCourier.querySelectorAll(window.data.classConst.TEX_TINPUT);

  var deliverStreet = document.querySelector('#deliver__street');
  var deliverHouse = document.querySelector('#deliver__house');
  var deliverRoom = document.querySelector('#deliver__room');

  toggleDeliverStore.addEventListener('change', function () {
    if (toggleDeliverStore.checked) {
      deliverCourier.classList.add(window.data.classConst.VISUALLY_HIDDEN);
      deliverStore.classList.remove(window.data.classConst.VISUALLY_HIDDEN);
      deliverStoreInputs.forEach(function (element) {
        element.disabled = false;
      });
      deliverCourierInputs.forEach(function (element) {
        element.disabled = true;
      });

      deliverStreet.required = false;
      deliverHouse.required = false;
      deliverRoom.required = false;
    }
  });

  toggleDeliverCourier.addEventListener('change', function () {
    if (toggleDeliverCourier.checked) {
      deliverStore.classList.add(window.data.classConst.VISUALLY_HIDDEN);
      deliverCourier.classList.remove(window.data.classConst.VISUALLY_HIDDEN);
      deliverCourierInputs.forEach(function (element) {
        element.disabled = false;
      });
      deliverStoreInputs.forEach(function (element) {
        element.disabled = true;
      });

      deliverStreet.required = true;
      deliverHouse.required = true;
      deliverRoom.required = true;
    }
  });

  // Проверка полей ввода

  var cardStatus = document.querySelector(window.data.classConst.PAYMENT_CARD_STATUS);

  var validateByLuhn = function (cardNumber) {
    var numbers = [];
    cardNumber = cardNumber.toString();
    for (var i = 0; i < cardNumber.length; i++) {
      if (i % 2 === 0) {
        var m = parseInt(cardNumber[i], 10) * 2;
        if (m > 9) {
          numbers.push(m - 9);
        } else {
          numbers.push(m);
        }
      } else {
        var n = parseInt(cardNumber[i], 10);
        numbers.push(n);
      }
    }
    var summ = numbers.reduce(function (a, b) {
      return a + b;
    });
    return Boolean(!(summ % 10));
  };

  var validateCardForm = function () {
    var paymentCardNumber = document.querySelector('#payment__card-number');
    if (!validateByLuhn(paymentCardNumber.value)) {
      paymentCardNumber.setCustomValidity('Карты не существует.');
      return false;
    }
    var paymentCardCvc = document.querySelector('#payment__card-cvc');
    if (paymentCardCvc.value.match(/[0-9]/) === null) {
      paymentCardCvc.setCustomValidity('CVC-код должен содержать только цифры.');
      return false;
    }
    var paymentCardHolder = document.querySelector('#payment__cardholder');
    if (!(paymentCardHolder.value.match(/[0-9]/) === null)) {
      paymentCardHolder.setCustomValidity('Имя держателя не должно содержать цифры.');
      return false;
    }
    var paymentCardDate = document.querySelector('#payment__card-date');
    if (paymentCardDate.value.match(/\//) === null) {
      paymentCardDate.setCustomValidity('Заполните поле по шаблону: ММ/ГГ');
      return false;
    }
    return true;
  };

  cardInputs.forEach(function (field) {
    field.addEventListener('blur', function () {
      if (validateCardForm()) {
        cardStatus.textContent = 'Одобрен';
      } else {
        cardStatus.textContent = 'Неизвестен';
      }
    });
  });

  // Отправка формы и всплывающее окно

  var checkoutForm = document.querySelector(window.data.classConst.CHECKOUT_FORM);
  var modalSuccess = document.querySelector(window.data.classConst.MODAL_SUCCESS);
  var modalFailure = document.querySelector(window.data.classConst.MODAL_FAILURE);
  checkoutForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.upload(new FormData(checkoutForm), function () {
      openPopup(modalSuccess);
    }, function () {
      openPopup(modalFailure);
    });

  });

  var openPopup = function (popup, text) {
    popup.classList.remove(window.data.classConst.MODAL_HIDDEN);
    document.addEventListener('keydown', onPopupEscPress);
    if (popup === modalFailure) {
      var code = popup.querySelector('.modal__message--code');
      code.textContent = text;
    }

    modalClose.forEach(function (element) {
      element.addEventListener('click', function (evt) {
        closePopup(evt.target);
      });
      element.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.data.keycodes.ENTER) {
          evt.preventDefault();
          closePopup(evt.target);
        }
      });
    });
  };

  var modalClose = document.querySelectorAll(window.data.classConst.MODAL_CLOSE);

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.data.keycodes.ESC) {
      evt.preventDefault();
      var currentCloseBtn = document.querySelector('.modal:not(.modal--hidden) .modal__close');
      closePopup(currentCloseBtn);
    }
  };

  var closePopup = function (closeBtn) {
    closeBtn.closest('.modal').classList.add(window.data.classConst.MODAL_HIDDEN);
    checkoutForm.reset();
    window.resetCart();
    document.removeEventListener('keydown', onPopupEscPress);
  };


  // Выбор станции метро

  var deliverStores = document.querySelector(window.data.classConst.DELIVER_STORES);
  var storesInputs = deliverStores.querySelectorAll(window.data.classConst.STORES_INPUTS);
  var mapImg = document.querySelector(window.data.classConst.MAP_IMG);
  var showMetroStation = function (evt) {
    var metroStation = evt.target.value;
    mapImg.src = 'img/map/' + metroStation + '.jpg';
  };

  storesInputs.forEach(function (element) {
    element.addEventListener('change', function (evt) {
      showMetroStation(evt);
    });
  });
})();
