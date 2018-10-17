'use strict';

(function () {
  window.data = {
    classConst: {
      VISUALLY_HIDDEN: 'visually-hidden',
      CATALOG_CARDS: '.catalog__cards',
      CATALOG_LOAD: '.catalog__load',
      CARD_TITLE: '.card__title',
      CATALOG_CARD: '.catalog__card',
      CARD: '#card',
      CARD_IMG: '.card__img',
      CARD_PRICE: '.card__price',
      STARS_RAITING: '.stars__rating',
      STAR_COUNT: '.star__count',
      CARD_COMPOSITION: '.card__composition-list',
      CARD_COMPOSITION_BLOCK: '.card__composition',
      GOODS_CARDS: '.goods__cards',
      CONTACT_INPUTS: '.contact-data__inputs',
      TEXT_INPUT: '.text-input__input',
      PAYMENT_CASH: '#payment__cash',
      PAYMENT_CASH_WRAP: '.payment__cash-wrap',
      PAYMENT_CARD: '#payment__card',
      PAYMENT_CARD_WRAP: '.payment__card-wrap',
      DELIVER_STORE: '.deliver__store',
      DELIVER_COURIER: '.deliver__courier',
      RANGE_FILTER: '.range__filter',
      RANGE_BTN_RIGHT: '.range__btn--right',
      RANGE_BTN_LEFT: '.range__btn--left',
      RANGE_PRICE_MAX: '.range__price--max',
      RANGE_PRICE_MIN: '.range__price--min',
      BTN_INPUT: '.input-btn__input',
      HEADER_BASKET: '.main-header__basket',
      ORDERED_NUMBER: '.card-order__count',
      CARD_ORDER_TITLE: '.card-order__title',
      CARD_ORDER_AMOUNT: '.card-order__amount',
      GOODS_CARD: '.goods_card',
      INCREASE_BTN: '.card-order__btn--increase',
      DECREASE_BTN: '.card-order__btn--decrease',
      CARD_CLOSE: '.card-order__close',
      CARD_ORDER_IMG: '.card-order__img',
      CARD_ORDER_PRICE: '.card-order__price',
      CARD_ORDER: '.card-order',
      CARD_CHAR: '.card__characteristic',
      EMPTY_CART: '.goods__card-empty',
      PAYMENT_CARD_STATUS: '.payment__card-status',
      CHECKOUT_FORM: '.checkout-form',
      DELIVER_STORES: '.deliver__stores',
      STORES_INPUTS: '.input-btn__input',
      MAP_IMG: '.deliver__store-map-img',
      MODAL_SUCCESS: '.modal--success',
      MODAL_FAILURE: '.modal--failure',
      MODAL_CLOSE: '.modal__close',
      MODAL_HIDDEN: 'modal--hidden'
    }
  };
  window.data.keycodes = {
    ESC: 27,
    ENTER: 13
  };
  window.data.other = {
    catalogCards: document.querySelector(window.data.classConst.CATALOG_CARDS),
    catalogLoad: document.querySelector(window.data.classConst.CATALOG_LOAD)
  };

  window.data.goodsConst = {
    AMOUNT_LITTLE_MIN: 1,
    AMOUNT_LITTLE_MAX: 5,

    IMG_PATH: 'img/cards/',
    IMG_TYPE: '.jpg'
  };

  var generateTextRaiting = function (raiting) {
    var raitingClass = '';

    switch (raiting) {
      case 1:
        raitingClass = 'stars__rating--one';
        break;
      case 2:
        raitingClass = 'stars__rating--two';
        break;
      case 3:
        raitingClass = 'stars__rating--three';
        break;
      case 4:
        raitingClass = 'stars__rating--four';
        break;
      case 5:
        raitingClass = 'stars__rating--five';
    }

    return raitingClass;
  };

  window.data.checkAmount = function (item, productClass) {
    productClass.classList.remove('card--in-stock');
    productClass.classList.remove('card--soon');
    productClass.classList.remove('card--little');
    if (item.amount === 0) {
      productClass.classList.add('card--soon');
    } else if (item.amount >= window.data.goodsConst.AMOUNT_LITTLE_MIN && item.amount < window.data.goodsConst.AMOUNT_LITTLE_MAX) {
      productClass.classList.add('card--little');
    } else if (item.amount >= window.data.goodsConst.AMOUNT_LITTLE_MAX) {
      productClass.classList.add('card--in-stock');
    }
  };

  window.data.goodsCreator = function (array) {
    var template = document.querySelector(window.data.classConst.CARD).content.querySelector(window.data.classConst.CATALOG_CARD);
    var fragment = document.createDocumentFragment();


    array.forEach(function (item) {
      var newCard = template.cloneNode(true);

      if (item.favorite) {
        var favorite = newCard.querySelector('.card__btn-favorite');
        favorite.classList.add('card__btn-favorite--selected');
      }

      window.data.checkAmount(item, newCard);

      var cardTitle = newCard.querySelector(window.data.classConst.CARD_TITLE);
      cardTitle.textContent = item.name;

      var cardImg = newCard.querySelector(window.data.classConst.CARD_IMG);
      cardImg.src = 'img/cards/' + item.picture;
      cardImg.alt = item.name;

      var cardPrice = newCard.querySelector(window.data.classConst.CARD_PRICE);
      cardPrice.innerHTML = item.price + ' ';

      var renderCurrencyAndWeight = function (weight) {
        var WeightTemplate = document.querySelector('#currency-and-weight').content;
        var text = WeightTemplate.cloneNode(true);

        var weightText = text.querySelector('.card__weight');
        weightText.textContent = '/ ' + weight + ' Г';

        cardPrice.appendChild(text);
      };
      renderCurrencyAndWeight(item.weight);

      var cardRaiting = newCard.querySelector(window.data.classConst.STARS_RAITING);
      var raiting = generateTextRaiting(item.rating.value);
      cardRaiting.classList.add(raiting);

      var starCount = newCard.querySelector(window.data.classConst.STAR_COUNT);
      starCount.textContent = '(' + item.rating.number + ')';

      var cardCharacteristic = newCard.querySelector(window.data.classConst.CARD_CHAR);
      if (item.nutritionFacts.sugar) {
        cardCharacteristic.textContent = 'Содержит сахар. ' + item.nutritionFacts.energy + ' ккал';
      } else {
        cardCharacteristic.textContent = 'Без сахара. ' + item.nutritionFacts.energy + ' ккал';
      }

      var cardComposition = newCard.querySelector(window.data.classConst.CARD_COMPOSITION);
      cardComposition.textContent = item.nutritionFacts.contents;

      var cardCompositon = newCard.querySelector('.card__main');
      var cardCompositionBlock = newCard.querySelector(window.data.classConst.CARD_COMPOSITION_BLOCK);
      cardCompositon.addEventListener('click', (function (block) {
        return function () {
          block.classList.toggle('card__composition--hidden');
        };
      })(cardCompositionBlock));

      fragment.appendChild(newCard);
    });

    window.data.other.catalogCards.appendChild(fragment);


    window.data.other.catalogCards.classList.remove('catalog__cards--load');
    window.data.other.catalogLoad.classList.add(window.data.classConst.VISUALLY_HIDDEN);

  };

  var onDataLoad = function (array) {
    window.goods = array;
    window.data.goodsCreator(array);
    var kindCounters = window.filterCounters(array, 'kind');
    var nutritionCounters = window.filterNutritions(array);
    var inStockCounters = window.filterInStock(array);

    var renderFilterCounts = function (countersArray, counter, whereToRender) {
      var number = 0;
      if (countersArray[counter]) {
        number = countersArray[counter];
      }
      whereToRender.textContent = '(' + number + ')';
    };

    var itemCounts = document.querySelectorAll('.input-btn__item-count');
    itemCounts.forEach(function (element) {
      var inputBtn = element.closest('.input-btn');
      var input = inputBtn.querySelector('.input-btn__input');
      var inputValue = input.value;
      var appropriateCounter;
      switch (inputValue) {
        case 'icecream':
          appropriateCounter = 'Мороженое';
          renderFilterCounts(kindCounters, appropriateCounter, element);
          break;
        case 'soda':
          appropriateCounter = 'Газировка';
          renderFilterCounts(kindCounters, appropriateCounter, element);
          break;
        case 'gum':
          appropriateCounter = 'Жевательная резинка';
          renderFilterCounts(kindCounters, appropriateCounter, element);
          break;
        case 'marmalade':
          appropriateCounter = 'Мармелад';
          renderFilterCounts(kindCounters, appropriateCounter, element);
          break;
        case 'marshmallows':
          appropriateCounter = 'Зефир';
          renderFilterCounts(kindCounters, appropriateCounter, element);
          break;
        case 'sugar':
          appropriateCounter = 'count';
          renderFilterCounts(nutritionCounters[0], appropriateCounter, element);
          break;
        case 'vegetarian':
          appropriateCounter = 'count';
          renderFilterCounts(nutritionCounters[1], appropriateCounter, element);
          break;
        case 'gluten':
          appropriateCounter = 'count';
          renderFilterCounts(nutritionCounters[2], appropriateCounter, element);
          break;
        case 'availability':
          appropriateCounter = 'availability';
          renderFilterCounts(inStockCounters, appropriateCounter, element);
      }
    });
  };

  window.backend.load(onDataLoad, window.backend.onError);
  window.data.cardsHolder = document.querySelector(window.data.classConst.GOODS_CARDS);
  window.data.cardsHolder.classList.remove('goods__cards--empty');
})();
