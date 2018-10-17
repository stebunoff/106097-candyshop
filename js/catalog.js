'use strict';

(function () {
  var contactData = document.querySelector(window.data.classConst.CONTACT_INPUTS);
  var contactDataInputs = contactData.querySelectorAll(window.data.classConst.TEXT_INPUT);
  var goodsInCart = [];

  var disableCheckout = function () {
    contactDataInputs.forEach(function (contactInput) {
      contactInput.disabled = true;
    });
  };

  disableCheckout();

  var enableCheckout = function () {
    contactDataInputs.forEach(function (contactInput) {
      contactInput.disabled = false;
    });
  };

  var headerBasket = document.querySelector(window.data.classConst.HEADER_BASKET);

  var goodsTotal = document.querySelector('.goods__total');
  var goodsTotalCount = goodsTotal.querySelector('.goods__total-count');
  var goodsOrderLink = goodsTotal.querySelector('.goods__order-link');
  var renderGoodsTotal = function (price) {
    var template = document.querySelector('#goods-cart-total').content;
    var text = template.cloneNode(true);

    var priceText = text.querySelector('.goods__price');
    priceText.textContent = price + ' ₽';

    goodsTotalCount.appendChild(text);
  };

  window.checkCartText = function () {
    if (goodsInCart.length > 0) {
      var totalPrice = 0;
      goodsInCart.forEach(function (item) {
        totalPrice = totalPrice + item.price * item.orderedAmount;
      });
      headerBasket.textContent = 'В корзине товаров: ' + goodsInCart.length + ' на сумму ' + totalPrice + ' ₽';

      goodsTotalCount.textContent = 'Итого за ' + goodsInCart.length + ' товаров: ';
      renderGoodsTotal(totalPrice);
      goodsOrderLink.classList.remove('goods__order-link--disabled');
      goodsTotal.classList.remove(window.data.classConst.VISUALLY_HIDDEN);
    } else if (goodsInCart.length === 0) {
      headerBasket.textContent = 'В корзине ничего нет';
      goodsOrderLink.classList.add('goods__order-link--disabled');
      goodsTotal.classList.add(window.data.classConst.VISUALLY_HIDDEN);
    }
  };

  var increaseGoodsNumber = function (productName, number) {
    window.goods.forEach(function (item) {
      if (item.name === productName) {
        item.amount = item.amount + number;
      }
    });
  };

  var deleteProduct = function (evt) {
    var targetProduct = evt.target.closest(window.data.classConst.CARD_ORDER);
    var targetProductName = targetProduct.querySelector(window.data.classConst.CARD_ORDER_TITLE).textContent;
    targetProduct.remove();


    goodsInCart.forEach(function (item, index) {
      if (item.name === targetProductName) {
        goodsInCart.splice(index, 1);
        increaseGoodsNumber(item.name, item.orderedAmount);
      }
    });
    if (goodsInCart.length === 0) {
      renderEmptyCart();
      disableCheckout();
    }
    window.checkCartText();
  };

  var increaseOrderedNumber = function (productName) {
    goodsInCart.forEach(function (itemInCart) {
      if (itemInCart.name === productName) {
        itemInCart.orderedAmount++;
      }
    });
  };

  var checkAmountInCatalog = function (object, title) {
    var ProductTitles = document.querySelectorAll('.card__title');
    ProductTitles.forEach(function (element) {
      if (element.textContent === title) {
        var catalogCard = element.closest('.catalog__card');
        window.data.checkAmount(object, catalogCard);
      }
    });
  };

  var decreaseOrderedNumber = function (evt, productName, item, name) {
    goodsInCart.forEach(function (itemInCart) {
      if (itemInCart.name === productName) {
        if (itemInCart.orderedAmount > 1) {
          itemInCart.orderedAmount--;
          window.cleanCart();
          goodsInCartCreator(goodsInCart);
          window.checkCartText();
          checkAmountInCatalog(item, name);
        } else {
          deleteProduct(evt);
        }
      }
    });
  };

  var goodsInCartCreator = function (goods) {
    goods.forEach(function (obj) {
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
      cardInCartAmount.value = obj.orderedAmount;

      var deleteCardInCart = newCard.querySelector(window.data.classConst.CARD_CLOSE);
      deleteCardInCart.addEventListener('click', function (evt) {
        deleteProduct(evt);
      });

      var increaseButton = newCard.querySelector(window.data.classConst.INCREASE_BTN);
      increaseButton.addEventListener('click', function (evt) {
        var currentProduct = evt.target.closest(window.data.classConst.GOODS_CARD);
        var productName = currentProduct.querySelector(window.data.classConst.CARD_ORDER_TITLE).textContent;

        window.goods.forEach(function (item) {
          if (item.name === productName) {
            if (item.amount > 0) {
              item.amount--;
              increaseOrderedNumber(productName);
              window.cleanCart();
              goodsInCartCreator(goodsInCart);
              window.checkCartText();
              checkAmountInCatalog(item, item.name);
            }
          }
        });
      });

      var decreaseButton = newCard.querySelector(window.data.classConst.DECREASE_BTN);
      decreaseButton.addEventListener('click', function (evt) {
        var currentProduct = evt.target.closest(window.data.classConst.GOODS_CARD);
        var productName = currentProduct.querySelector(window.data.classConst.CARD_ORDER_TITLE).textContent;

        window.goods.forEach(function (item) {
          if (item.name === productName) {
            item.amount++;
            decreaseOrderedNumber(evt, productName, item, item.name);
          }
        });
      });

      fragment.appendChild(newCard);

      window.data.cardsHolder.appendChild(fragment);
      enableCheckout();
    });
  };

  // Избранное

  var favoriteCounter = document.querySelector('.input-btn__item-fav-counter');
  window.data.other.catalogCards.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__btn-favorite')) {
      var currentProduct = evt.target.closest(window.data.classConst.CATALOG_CARD);
      var productName = currentProduct.querySelector(window.data.classConst.CARD_TITLE).textContent;

      if (!evt.target.classList.contains('card__btn-favorite--selected')) {
        window.goods.forEach(function (item) {
          if (item.name === productName) {
            item.favorite = true;
          }
        });
      } else {
        window.goods.forEach(function (item) {
          if (item.name === productName) {
            item.favorite = false;
          }
        });
      }

      window.favorite = window.goods.filter(function (item) {
        return item.favorite === true;
      });
      favoriteCounter.textContent = '(' + window.favorite.length + ')';
      evt.target.classList.toggle('card__btn-favorite--selected');
    }
  });

  // Добавление в корзину

  var renderEmptyCart = function () {
    var template = document.querySelector('#cards-empty').content;
    var message = template.cloneNode(true);
    window.data.cardsHolder.appendChild(message);
  };

  window.cleanCart = function () {
    window.data.cardsHolder.innerHTML = '';
    if (goodsInCart.length === 0) {
      renderEmptyCart();
    }
  };

  window.data.other.catalogCards.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__btn')) {
      var currentProduct = evt.target.closest(window.data.classConst.CATALOG_CARD);
      var productName = currentProduct.querySelector(window.data.classConst.CARD_TITLE).textContent;

      var checkItemInCart = goodsInCart.filter(function (item) {
        return item.name === productName;
      }).length;

      window.goods.forEach(function (item) {
        if (item.name === productName) {
          if (item.amount > 0) {
            item.amount--;
            if (checkItemInCart) {
              goodsInCart.forEach(function (itemInCart) {
                if (itemInCart.name === productName) {
                  itemInCart.orderedAmount++;
                }
              });
            } else {
              var newProductInCart = Object.assign({}, item);
              newProductInCart.orderedAmount = 1;
              goodsInCart.push(newProductInCart);
            }
            window.cleanCart();
            goodsInCartCreator(goodsInCart);
            window.checkCartText();
          }
          window.data.checkAmount(item, currentProduct);
        }
      });
    }
  });

  window.resetCart = function () {
    goodsInCart = [];
    window.cleanCart();
    window.checkCartText();
  };

})();
