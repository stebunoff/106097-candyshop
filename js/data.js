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
    },
    keycodes: {
      ESC: 27,
      ENTER: 13
    }
  };

  var goodsNames = [
    'Чесночные сливки',
    'Огуречный педант',
    'Молочная хрюша',
    'Грибной шейк',
    'Баклажановое безумие',
    'Паприколу итальяно',
    'Нинзя-удар васаби',
    'Хитрый баклажан',
    'Горчичный вызов',
    'Кедровая липучка',
    'Корманный портвейн',
    'Чилийский задира',
    'Беконовый взрыв',
    'Арахис vs виноград',
    'Сельдерейная душа',
    'Початок в бутылке',
    'Чернющий мистер чеснок',
    'Раша федераша',
    'Кислая мина',
    'Кукурузное утро',
    'Икорный фуршет',
    'Новогоднее настроение',
    'С пивком потянет',
    'Мисс креветка',
    'Бесконечный взрыв',
    'Невинные винные',
    'Бельгийское пенное',
    'Острый язычок'
  ];

  var goodsConst = {
    GOODS_NUMBER: 26,
    GOODS_IN_CART: 3,

    AMOUNT_MIN: 0,
    AMOUNT_LITTLE_MIN: 1,
    AMOUNT_LITTLE_MAX: 5,
    AMOUNT_MAX: 20,

    PRICE_MIN: 100,
    PRICE_MAX: 1500,

    WEIGHT_MIN: 30,
    WEIGHT_MAX: 300,

    RAITING_VALUE_MIN: 1,
    RAITING_VALUE_MAX: 5,

    RAITING_NUMBER_MIN: 10,
    RAITING_NUMBER_MAX: 900,

    ENERGY_MIN: 70,
    ENERGY_MAX: 500,
    IMG_PATH: 'img/cards/',
    IMG_TYPE: '.jpg'
  };

  var goodsComponents = [
    'молоко',
    'сливки',
    'вода',
    'пищевой краситель',
    'патока',
    'ароматизатор бекона',
    'ароматизатор свинца',
    'ароматизатор дуба, идентичный натуральному',
    'ароматизатор картофеля',
    'лимонная кислота',
    'загуститель',
    'эмульгатор',
    'консервант: сорбат калия',
    'посолочная смесь: соль, нитрит натрия',
    'ксилит',
    'карбамид',
    'вилларибо',
    'виллабаджо'
  ];

  var goodsPictures = [
    'gum-cedar',
    'gum-chile',
    'gum-eggplant',
    'gum-mustard',
    'gum-portwine',
    'gum-wasabi',
    'ice-cucumber',
    'ice-eggplant',
    'ice-garlic',
    'ice-italian',
    'ice-mushroom',
    'ice-pig',
    'marmalade-beer',
    'marmalade-caviar',
    'marmalade-corn',
    'marmalade-new-year',
    'marmalade-sour',
    'marshmallow-bacon',
    'marshmallow-beer',
    'marshmallow-shrimp',
    'marshmallow-spicy',
    'marshmallow-wine',
    'soda-bacon',
    'soda-celery',
    'soda-cob',
    'soda-garlic',
    'soda-peanut-grapes',
    'soda-russian'
  ];

  var generateRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  var generateRandomBoolean = function () {
    var booleanRandom = Math.random() > 0.5;
    return Boolean(booleanRandom);
  };

  var pickRandomItem = function (array) {
    return array[generateRandomInteger(0, array.length - 1)];
  };

  var generateNutritionContents = function (array) {
    var nutritionContents = [];
    var contentsLength = generateRandomInteger(1, array.length);
    for (var i = 0; i < contentsLength; i++) {
      var nutritionComponent = pickRandomItem(array);
      if (nutritionContents.indexOf(nutritionComponent) !== -1) {
        nutritionContents.push(nutritionComponent);
      }
    }

    var contents = '';
    for (var j = 0; nutritionContents.length; j++) {
      contents = contents + ', ' + nutritionContents[j];
    }
    return contents;
  };

  window.data.goods = [];

  var generateGoods = function (array, goodsNumber) {
    for (var i = 0; i < goodsNumber; i++) {
      var productName = pickRandomItem(goodsNames);
      var productPicture = goodsConst.IMG_PATH + pickRandomItem(goodsPictures) + goodsConst.IMG_TYPE;
      var productAmount = generateRandomInteger(goodsConst.AMOUNT_MIN, goodsConst.AMOUNT_MAX);
      var productPrice = generateRandomInteger(goodsConst.PRICE_MIN, goodsConst.PRICE_MAX);
      var productWeight = generateRandomInteger(goodsConst.WEIGHT_MIN, goodsConst.WEIGHT_MAX);
      var productRaitingValue = generateRandomInteger(goodsConst.RAITING_VALUE_MIN, goodsConst.RAITING_VALUE_MAX);
      var productRaitingNumber = generateRandomInteger(goodsConst.RAITING_NUMBER_MIN, goodsConst.RAITING_NUMBER_MAX);
      var productEnergy = generateRandomInteger(goodsConst.ENERGY_MIN, goodsConst.ENERGY_MAX);

      array[i] = {
        name: productName,
        picture: productPicture,
        amount: productAmount,
        price: productPrice,
        weight: productWeight,
        rating: {
          value: productRaitingValue,
          number: productRaitingNumber
        },
        nutritionFacts: {
          sugar: generateRandomBoolean(),
          energy: productEnergy,
          contents: generateNutritionContents(goodsComponents)
        }
      };
    }
  };

  generateGoods(window.data.goods, goodsConst.GOODS_NUMBER);

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

  window.data.catalogCards = document.querySelector(window.data.classConst.CATALOG_CARDS);
  window.data.catalogLoad = document.querySelector(window.data.classConst.CATALOG_LOAD);

  var goodsCreator = function (array) {
    var template = document.querySelector(window.data.classConst.CARD).content.querySelector(window.data.classConst.CATALOG_CARD);
    var fragment = document.createDocumentFragment();


    for (var i = 0; i < array.length; i++) {
      var newCard = template.cloneNode(true);

      if (array[i].amount === 0) {
        newCard.classList.add('card--soon');
      } else if (array[i].amount >= goodsConst.AMOUNT_LITTLE_MIN && array[i] < goodsConst.AMOUNT_LITTLE_MAX) {
        newCard.classList.add('card--little');
      } else if (array[i].amount >= goodsConst.AMOUNT_LITTLE_MAX) {
        newCard.classList.add('card--in-stock');
      }

      var cardTitle = newCard.querySelector(window.data.classConst.CARD_TITLE);
      cardTitle.textContent = array[i].name;

      var cardImg = newCard.querySelector(window.data.classConst.CARD_IMG);
      cardImg.src = array[i].picture;
      cardImg.alt = array[i].name;

      var cardPrice = newCard.querySelector(window.data.classConst.CARD_PRICE);
      cardPrice.innerHTML = array[i].price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + array[i].weight + ' Г</span>';

      var cardRaiting = newCard.querySelector(window.data.classConst.STARS_RAITING);
      cardRaiting.classList.add = generateTextRaiting(array[i].rating.value);

      var starCount = newCard.querySelector(window.data.classConst.STAR_COUNT);
      starCount.textContent = '(' + array[i].rating.number + ')';

      var cardCharacteristic = newCard.querySelector(window.data.classConst.CARD_CHAR);
      if (array[i].nutritionFacts.sugar) {
        cardCharacteristic.textContent = 'Содержит сахар. ' + array[i].nutritionFacts.energy + ' ккал';
      } else {
        cardCharacteristic.textContent = 'Без сахара. ' + array[i].nutritionFacts.energy + ' ккал';
      }

      var cardComposition = newCard.querySelector(window.data.classConst.CARD_COMPOSITION);
      cardComposition.textContent = array[i].nutritionFacts.contents;

      fragment.appendChild(newCard);
    }

    window.data.catalogCards.appendChild(fragment);


    window.data.catalogCards.classList.remove('catalog__cards--load');
    window.data.catalogLoad.classList.add(window.data.classConst.VISUALLY_HIDDEN);
  };

  goodsCreator(window.data.goods);

  window.data.cardsHolder = document.querySelector(window.data.classConst.GOODS_CARDS);
  window.data.cardsHolder.classList.remove('goods__cards--empty');
})();
