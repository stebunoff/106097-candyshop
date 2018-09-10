'use strict';

var goods = [];

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
  ENERGY_MAX: 500
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
  '/img/cards/gum-cedar.jpg',
  '/img/cards/gum-chile.jpg',
  '/img/cards/gum-eggplant.jpg',
  '/img/cards/gum-mustard.jpg',
  '/img/cards/gum-portwine.jpg',
  '/img/cards/gum-wasabi.jpg',
  '/img/cards/ice-cucumber.jpg',
  '/img/cards/ice-eggplant.jpg',
  '/img/cards/ice-garlic.jpg',
  '/img/cards/ice-italian.jpg',
  '/img/cards/ice-mushroom.jpg',
  '/img/cards/ice-pig.jpg',
  '/img/cards/marmalade-beer.jpg',
  '/img/cards/marmalade-caviar.jpg',
  '/img/cards/marmalade-corn.jpg',
  '/img/cards/marmalade-new-year.jpg',
  '/img/cards/marmalade-sour.jpg',
  '/img/cards/marshmallow-bacon.jpg',
  '/img/cards/marshmallow-beer.jpg',
  '/img/cards/marshmallow-shrimp.jpg',
  '/img/cards/marshmallow-spicy.jpg',
  '/img/cards/marshmallow-wine.jpg',
  '/img/cards/soda-bacon.jpg',
  '/img/cards/soda-celery.jpg',
  '/img/cards/soda-cob.jpg',
  '/img/cards/soda-garlic.jpg',
  '/img/cards/soda-peanut-grapes.jpg',
  '/img/cards/soda-russian.jpg'
];

var generateRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var generateRandomBoolean = function () {
  var boolean_random = Math.random() >= 0.5;
  return Boolean(boolean_random);
};

var checkAvailability = function (array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
};

var generateNutritionContents = function (array) {
  var NutritionContents = [];
  var contentsLength = generateRandomInteger(1, array.length);
  for (var i = 0; i < contentsLength; i++) {
    var nutritionComponentPosition = generateRandomInteger(0, contentsLength - 1);
    NutritionContents.push(nutritionComponentPosition);
    if (!checkAvailability(NutritionContents, nutritionComponentPosition)) {
      NutritionContents.push(array[nutritionComponentPosition])
    }
  }

  var contents = '';
  for (var i = 0; NutritionContents.length; i++) {
    contents = contents + ', ' + NutritionContents[i];
  }
  return contents;
};

var generateGoods = function (goodsNumber) {
  for (var i = 0; i < goodsNumber; i++) {
    var productName = goodsNames[generateRandomInteger(0, goodsNames.length - 1)];
    var productPicture = goodsPictures[generateRandomInteger(0, goodsNames.length - 1)];
    var productAmount = generateRandomInteger(goodsConst.AMOUNT_MIN, goodsConst.AMOUNT_MAX);
    var productPrice = generateRandomInteger(goodsConst.PRICE_MIN, goodsConst.PRICE_MAX);
    var productWeight = generateRandomInteger(goodsConst.WEIGHT_MIN, goodsConst.WEIGHT_MAX);
    var productRaitingValue = generateRandomInteger(goodsConst.RAITING_VALUE_MIN, goodsConst.RAITING_VALUE_MAX);
    var productRaitingNumber = generateRandomInteger(goodsConst.RAITING_NUMBER_MIN, goodsConst.RAITING_NUMBER_MAX);
    var productEnergy = generateRandomInteger(goodsConst.ENERGY_MIN, goodsConst.ENERGY_MAX);

    goods[i] = {
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
    }
  }
};

generateGoods(goodsConst.GOODS_NUMBER);

var generateTextRaiting = function (raiting) {
  var raitingClass = '';

  if (raiting === 1) {
    raitingClass = 'stars__rating--one';
  } else if (raiting === 2) {
    raitingClass = 'stars__rating--two';
  } else if (raiting === 3) {
    raitingClass = 'stars__rating--three';
  } else if (raiting === 4) {
    raitingClass = 'stars__rating--four';
  } else if (raiting === 5) {
    raitingClass = 'stars__rating--five';
  }

  return raitingClass;
};

var goodsCreator = function (array) {
  var template = document.querySelector('.catalog__card');
  var fragment = document.createDocumentFragment();


  for (var i = 0; array.length; i++) {
    var newCard = template.cloneNode(true);

    if (array[i].amount === 0) {
      newCard.classList.add('card--soon');
    } else if (array[i].amount >= goodsConst.AMOUNT_LITTLE_MIN && array[i] < goodsConst.AMOUNT_LITTLE_MAX) {
      newCard.classList.add('card--little');
    } else if (array[i].amount >= goodsConst.AMOUNT_LITTLE_MAX) {
      newCard.classList.add('card--in-stock');
    }

    var cardTitle = newCard.content.querySelector('.card__title');
    cardTitle.textContent = array[i].name;

    var cardImg = newCard.content.querySelector('.card__img');
    cardImg.setAttribute(src, array[i].picture);

    var cardPrice = newCard.content.querySelector('.card__price');
    cardPrice.innerHTML = array[i].price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + array[i].weight + ' Г</span>';

    var cardRaiting = newCard.content.querySelector('.stars__rating');
    cardRaiting.classList.add = generateTextRaiting(array[i].rating.value);

    var starCount = newCard.content.querySelector('.star__count');
    starCount.textContent = '(' + array[i].rating.number + ')';

    var cardCharacteristic = newCard.content.querySelector('.card__characteristic');
    if (array[i].nutritionFacts.sugar) {
      cardCharacteristic.textContent = 'Содержит сахар. ' + array[i].nutritionFacts.energy + ' ккал';
    } else {
      cardCharacteristic.textContent = 'Без сахара. ' + array[i].nutritionFacts.energy + ' ккал';
    }

    var cardComposition = newCard.content.querySelector('.card__composition-list');
    cardComposition.textContent = array[i].nutritionFacts.contents;

    fragment.appendChild(newCard);
  }

  var cardsHolder = document.querySelector('.catalog__cards');
  cardsHolder.appendChild(fragment);
};

goodsCreator(generateGoods(goodsConst.GOODS_NUMBER));

var goodsInCartCreator = function (array) {
  var template = document.querySelector('.goods_card');
  var fragment = document.createDocumentFragment();

  for (var i = 0; array.length; i++) {
    var newCard = template.cloneNode(true);

    var cardInCartTitle = newCard.content.querySelector('.card-order__title');
    cardInCartTitle.textContent = array[i].name;

    var cardInCartPrice = newCard.content.querySelector('.card-order__price');
    cardInCartPrice.textContent = array[i].price + ' ₽';

    var cardInCartImg = newCard.content.querySelector('.card-order__img');
    cardInCartImg.setAttribute(src, array[i].picture);
  }

  var cardsHolder = document.querySelector('.goods__cards');
  cardsHolder.appendChild(fragment);
};

goodsInCartCreator(generateGoods(goodsConst.GOODS_IN_CART));
