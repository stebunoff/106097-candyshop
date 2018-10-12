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
  var paymentCardNumber = document.querySelector('#payment__card-number');
  var paymentCardCvc = document.querySelector('#payment__card-cvc');
  var paymentCardHolder = document.querySelector('#payment__cardholder');
  var paymentCardDate = document.querySelector('#payment__card-date');

  var validateByLuna = function (value) {
    var summ = 0;
    var values = value.split('');
    values.forEach(function (element, index) {
      element = parseInt(element, 10);
      if (index % 2 === 0) {
        element = element * 2;
        if (element > 9) {
          element = element - 9;
        }
      }
      summ = summ + element;
    });
    if (!(summ % 10 === 0)) {
      paymentCardNumber.setCustomValidity('Карты с таким номером не существует.');
    }
    return Boolean(!(summ % 10));
  };

  var validate = function (fields) {
    var validationStatus = [];
    fields.forEach(function (element) {
      if (!element.value) {
        validationStatus.push(false);
      } else if (element.name === 'card-number') {
        validationStatus.push(validateByLuna(element.value));
      } else if ((element.name === 'card-cvc') && (element.value.match(/[0-9]/) === null)) {
        validationStatus.push(false);
        paymentCardCvc.setCustomValidity('CVC-код должен содержать только цифры.');
      } else if ((element.name === 'cardholder') && !(element.value.match(/[0-9]/) === null)) {
        paymentCardHolder.setCustomValidity('Имя держателя не должно содержать цифры.');
        validationStatus.push(false);
      } else if ((element.name === 'card-date') && (element.value.match(/\//) === null)) {
        paymentCardDate.setCustomValidity('Заполните поле по шаблону: ММ/ГГ');
        validationStatus.push(false);
      }
    });
    for (var i = 0; i < validationStatus.length; i++) {
      if (!validationStatus[i]) {
        return false;
      }
    }
    return true;
  };

  for (var i = 0; i < cardInputs.length; i++) {
    cardInputs[i].addEventListener('blur', function () {
      if (validate(cardInputs)) {
        cardStatus.textContent = 'Одобрен';
      } else {
        cardStatus.textContent = 'Неизвестен';
      }
    });
  }

  // Отправка формы и всплывающее окно

  var checkoutForm = document.querySelector(window.data.classConst.CHECKOUT_FORM);
  var modalSuccess = document.querySelector(window.data.classConst.MODAL_SUCCESS);
  var modalFailure = document.querySelector(window.data.classConst.MODAL_FAILURE);
  checkoutForm.addEventListener('submit', function (evt) {
    if (validate(cardInputs)) {
      window.backend.upload(new FormData(checkoutForm), function () {
        openPopup(modalSuccess);
      });
    } else {
      openPopup(modalFailure);
    }
    evt.preventDefault();
  });

  var openPopup = function (popup) {
    popup.classList.remove(window.data.classConst.MODAL_HIDDEN);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var modalClose = document.querySelectorAll(window.data.classConst.MODAL_CLOSE);

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.data.keycodes.ESC) {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    modalClose.forEach(function (element) {
      element.classList.add(window.data.classConst.MODAL_HIDDEN);
      document.removeEventListener('keydown', onPopupEscPress);
    });
  };

  modalClose.forEach(function (element) {
    element.addEventListener('click', function () {
      closePopup();
    });
    element.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.keycodes.ENTER) {
        evt.preventDefault();
        closePopup();
      }
    });
  });

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
