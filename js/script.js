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
  ENERGY_MAX: 500,
  IMG_PATH = 'img/cards/',
  IMG_TYPE = ''
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
  var boolean_random = Math.random() > 0.5;
  return Boolean(boolean_random);
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
      nutritionContents.push(nutritionComponent)
    }
  }

  var contents = '';
  for (var i = 0; nutritionContents.length; i++) {
    contents = contents + ', ' + nutritionContents[i];
  }
  return contents;
};

var generateGoods = function (goodsNumber) {
  for (var i = 0; i < goodsNumber; i++) {
    var productName = pickRandomItem(goodsNames);
    var productPicture = goodsConst.IMG_PATH + pickRandomItem(goodsPictures) + goodsConst.IMG_TYPE;
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

var goodsCreator = function (array) {
  var template = document.querySelector('.catalog__card');
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

    var cardTitle = newCard.content.querySelector('.card__title');
    cardTitle.textContent = array[i].name;

    var cardImg = newCard.content.querySelector('.card__img');
    cardImg.src = array[i].picture;

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

  for (var i = 0; i < array.length; i++) {
    var newCard = template.cloneNode(true);

    var cardInCartTitle = newCard.content.querySelector('.card-order__title');
    cardInCartTitle.textContent = array[i].name;

    var cardInCartPrice = newCard.content.querySelector('.card-order__price');
    cardInCartPrice.textContent = array[i].price + ' ₽';

    var cardInCartImg = newCard.content.querySelector('.card-order__img');
    cardInCartImg.src = array[i].picture;
  }

  var cardsHolder = document.querySelector('.goods__cards');
  cardsHolder.appendChild(fragment);
};

goodsInCartCreator(generateGoods(goodsConst.GOODS_IN_CART));