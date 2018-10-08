'use strict';
(function () {
  var contactData = document.querySelector(window.data.classConst.CONTACT_INPUTS);
  var contactDataInputs = contactData.querySelectorAll(window.data.classConst.TEXT_INPUT);
  var goodsInCart = [];

  var disableCheckout = function () {
    for (var i = 0; i < contactDataInputs.length; i++) {
      contactDataInputs[i].disabled = true;
    }
  };

  disableCheckout();

  var enableCheckout = function () {
    for (var i = 0; i < contactDataInputs.length; i++) {
      contactDataInputs[i].disabled = false;
    }
  };

  var headerBasket = document.querySelector(window.data.classConst.HEADER_BASKET);

  var checkCartText = function () {
    if (goodsInCart.length > 0) {
      headerBasket.textContent = 'В корзине товаров: ' + goodsInCart.length;
    } else if (goodsInCart.length === 0) {
      headerBasket.textContent = 'В корзине ничего нет';
    }
  };

  var deleteProduct = function (evt) {
    var targetProduct = evt.target.closest(window.data.classConst.GOODS_CARD);
    var targetProductName = targetProduct.querySelector(window.data.classConst.CARD_ORDER_TITLE).textContent;
    targetProduct.remove();

    for (var i = 0; i < goodsInCart.length; i++) {
      if (goodsInCart[i].name === targetProductName) {
        goodsInCart.splice(i - 1, 1);
      }
    }

    checkCartText();

    if (window.data.cardsHolder.querySelector(window.data.classConst.GOODS_CARD) === null) {
      cardsEmpty.classList.remove(window.data.classConst.VISUALLY_HIDDEN);
    }
  };

  var increaseOrderedNumber = function (searchedElement, objectInCart) {
    objectInCart.orderedAmount++;

    var cards = window.data.cardsHolder.querySelectorAll(window.data.classConst.GOODS_CARD);
    for (var i = 0; i < cards.length; i++) {
      var cardTitle = cards[i].querySelector(window.data.classConst.CARD_ORDER_TITLE);
      if (cardTitle.textContent === searchedElement) {
        var orderedNumber = cards[i].querySelector(window.data.classConst.ORDERED_NUMBER);
        orderedNumber.value++;
      }
    }
  };

  var goodsInCartCreator = function (obj) {
    var template = document.querySelector('#card-order').content.querySelector(window.data.classConst.GOODS_CARD);
    var fragment = document.createDocumentFragment();

    var newCard = template.cloneNode(true);

    var cardInCartTitle = newCard.querySelector(window.data.classConst.CARD_ORDER_TITLE);
    cardInCartTitle.textContent = obj.name;

    var cardInCartPrice = newCard.querySelector(window.data.classConst.CARD_ORDER_PRICE);
    cardInCartPrice.textContent = obj.price + ' ₽';

    var cardInCartImg = newCard.querySelector(window.data.classConst.CARD_ORDER_IMG);
    cardInCartImg.src = 'img/cards/' + obj.picture;
    cardInCartImg.alt = obj.name;

    var cardInCartAmount = newCard.querySelector(window.data.classConst.ORDERED_NUMBER);
    cardInCartAmount.value = 1;

    var deleteCardInCart = newCard.querySelector(window.data.classConst.CARD_CLOSE);
    deleteCardInCart.addEventListener('click', function (evt) {
      deleteProduct(evt);
      if (goodsInCart.length === 0) {
        disableCheckout();
      }
    });

    var increaseButton = newCard.querySelector(window.data.classConst.INCREASE_BTN);
    increaseButton.addEventListener('click', function (evt) {
      var currentProduct = evt.target.closest(window.data.classConst.GOODS_CARD);
      var productName = currentProduct.querySelector(window.data.classConst.CARD_ORDER_TITLE).textContent;

      var isProductName = function (object) {
        return object.name === productName;
      };

      var objectInCatalog = window.goods.find(isProductName);
      if (objectInCatalog.amount > 0) {
        objectInCatalog.amount--;
        var objectInCart = goodsInCart.find(isProductName);
        increaseOrderedNumber(productName, objectInCart);
      }
    });

    var decreaseButton = newCard.querySelector(window.data.classConst.DECREASE_BTN);
    decreaseButton.addEventListener('click', function (evt) {
      var currentProduct = evt.target.closest(window.data.classConst.GOODS_CARD);
      var productName = currentProduct.querySelector(window.data.classConst.CARD_ORDER_TITLE).textContent;

      var isProductName = function (object) {
        return object.name === productName;
      };

      var objectInCatalog = window.goods.find(isProductName);

      var productAmountLabel = evt.target.closest(window.data.classConst.CARD_ORDER_AMOUNT);
      var productCount = productAmountLabel.querySelector(window.data.classConst.ORDERED_NUMBER);
      objectInCatalog.amount++;
      if (productCount.value > 1) {
        productCount.value--;
        var objectInCart = goodsInCart.find(isProductName);
        objectInCart.orderedAmount--;
      } else {
        deleteProduct(evt);
        if (goodsInCart.length === 0) {
          disableCheckout();
        }
      }
    });

    fragment.appendChild(newCard);

    window.data.cardsHolder.appendChild(fragment);
    enableCheckout();
  };

  // Избранное

  window.data.other.catalogCards.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__btn-favorite')) {
      evt.target.classList.toggle('card__btn-favorite--selected');
    }

  });

  // Добавление в корзину

  var findObject = function (array, condition) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].name === condition) {
        return true;
      }
    }

    return false;
  };

  var copyObject = function (array, condition) {
    var filterByName = function (obj) {
      if (obj.name === condition) {
        return true;
      }

      return false;
    };
    var filteredArray = array.filter(filterByName);
    var copy = Object.assign({}, filteredArray[0]);

    return copy;
  };

  var modifyObject = function (obj) {
    delete obj.amount;
    obj.orderedAmount = 1;

    return obj;
  };

  var cardsEmpty = document.querySelector(window.data.classConst.EMPTY_CART);

  window.data.other.catalogCards.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__btn')) {
      var currentProduct = evt.target.closest(window.data.classConst.CATALOG_CARD);
      var productName = currentProduct.querySelector(window.data.classConst.CARD_TITLE).textContent;

      var isProductName = function (obj) {
        return obj.name === productName;
      };

      var objectInCatalog = window.goods.find(isProductName);
      if (objectInCatalog.amount > 0) {
        var productObject = copyObject(window.goods, productName);
        var modifiedObject = modifyObject(productObject);
        if (findObject(goodsInCart, productName)) {
          var objectInCart = goodsInCart.find(isProductName);
          increaseOrderedNumber(productName, objectInCart);
        } else {
          goodsInCartCreator(modifiedObject);
          goodsInCart.push(modifiedObject);

          checkCartText();
          cardsEmpty.classList.add(window.data.classConst.VISUALLY_HIDDEN);
        }
        objectInCatalog.amount--;
      }
    }
  });
})();
