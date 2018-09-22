'use strict';

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

var goods = [];
var goodsInCart = [];

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

generateGoods(goods, goodsConst.GOODS_NUMBER);

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

var catalogCards = document.querySelector('.catalog__cards');
var catalogLoad = document.querySelector('.catalog__load');

var goodsCreator = function (array) {
  var template = document.querySelector('#card').content.querySelector('.catalog__card');
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

    var cardTitle = newCard.querySelector('.card__title');
    cardTitle.textContent = array[i].name;

    var cardImg = newCard.querySelector('.card__img');
    cardImg.src = array[i].picture;
    cardImg.alt = array[i].name;

    var cardPrice = newCard.querySelector('.card__price');
    cardPrice.innerHTML = array[i].price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + array[i].weight + ' Г</span>';

    var cardRaiting = newCard.querySelector('.stars__rating');
    cardRaiting.classList.add = generateTextRaiting(array[i].rating.value);

    var starCount = newCard.querySelector('.star__count');
    starCount.textContent = '(' + array[i].rating.number + ')';

    var cardCharacteristic = newCard.querySelector('.card__characteristic');
    if (array[i].nutritionFacts.sugar) {
      cardCharacteristic.textContent = 'Содержит сахар. ' + array[i].nutritionFacts.energy + ' ккал';
    } else {
      cardCharacteristic.textContent = 'Без сахара. ' + array[i].nutritionFacts.energy + ' ккал';
    }

    var cardComposition = newCard.querySelector('.card__composition-list');
    cardComposition.textContent = array[i].nutritionFacts.contents;

    fragment.appendChild(newCard);
  }

  catalogCards.appendChild(fragment);


  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add('visually-hidden');
};

goodsCreator(goods);

var cardsHolder = document.querySelector('.goods__cards');
cardsHolder.classList.remove('goods__cards--empty');

var headerBasket = document.querySelector('.main-header__basket');

var checkCartText = function () {
  if (goodsInCart.length > 0) {
    headerBasket.textContent = 'В корзине товаров: ' + goodsInCart.length;
  } else if (goodsInCart.length === 0) {
    headerBasket.textContent = 'В корзине ничего нет';
  }
};

var deleteProduct = function (evt) {
  var targetProduct = evt.target.closest('.goods_card');
  var targetProductName = targetProduct.querySelector('.card-order__title').textContent;
  targetProduct.remove();

  for (var i = 0; i < goodsInCart.length; i++) {
    if (goodsInCart[i].name === targetProductName) {
      goodsInCart.splice(i - 1, 1);
    }
  }

  checkCartText();

  if (cardsHolder.querySelector('.goods_card') === null) {
    cardsEmpty.classList.remove('visually-hidden');
  }
};

var goodsInCartCreator = function (obj) {
  var template = document.querySelector('#card-order').content.querySelector('.goods_card');
  var fragment = document.createDocumentFragment();

  var newCard = template.cloneNode(true);

  var cardInCartTitle = newCard.querySelector('.card-order__title');
  cardInCartTitle.textContent = obj.name;

  var cardInCartPrice = newCard.querySelector('.card-order__price');
  cardInCartPrice.textContent = obj.price + ' ₽';

  var cardInCartImg = newCard.querySelector('.card-order__img');
  cardInCartImg.src = obj.picture;
  cardInCartImg.alt = obj.name;

  var cardInCartAmount = newCard.querySelector('.card-order__count');
  cardInCartAmount.value = 1;

  var deleteCardInCart = newCard.querySelector('.card-order__close');
  deleteCardInCart.addEventListener('click', function (evt) {
    deleteProduct(evt);
  });

  var increaseButton = newCard.querySelector('.card-order__btn--increase');
  increaseButton.addEventListener('click', function (evt) {
    var currentProduct = evt.target.closest('.goods_card');
    var productName = currentProduct.querySelector('.card-order__title').textContent;

    var isProductName = function (object) {
      return object.name === productName;
    };

    var objectInCatalog = goods.find(isProductName);
    if (objectInCatalog.amount > 0) {
      var productAmountLabel = evt.target.closest('.card-order__amount');
      var productCount = productAmountLabel.querySelector('.card-order__count');
      productCount.value++;
      objectInCatalog.amount--;
    }
  });

  var decreaseButton = newCard.querySelector('.card-order__btn--decrease');
  decreaseButton.addEventListener('click', function (evt) {
    var currentProduct = evt.target.closest('.goods_card');
    var productName = currentProduct.querySelector('.card-order__title').textContent;

    var isProductName = function (object) {
      return object.name === productName;
    };

    var objectInCatalog = goods.find(isProductName);

    var productAmountLabel = evt.target.closest('.card-order__amount');
    var productCount = productAmountLabel.querySelector('.card-order__count');
    objectInCatalog.amount++;
    if (productCount.value > 1) {
      productCount.value--;
    } else {
      deleteProduct(evt);
    }
  });

  fragment.appendChild(newCard);

  cardsHolder.appendChild(fragment);
};

// Выбор способа оплаты

var toggleCash = document.querySelector('#payment__cash');
var toggleCard = document.querySelector('#payment__card');
var paymentByCash = document.querySelector('.payment__cash-wrap');
var paymentByCard = document.querySelector('.payment__card-wrap');
var cardInputs = paymentByCard.querySelectorAll('.text-input__input');

toggleCash.addEventListener('change', function () {
  if (toggleCash.checked) {
    paymentByCard.classList.add('visually-hidden');
    paymentByCash.classList.remove('visually-hidden');
    cardInputs.forEach(function (element) {
      element.disabled = true;
    });
  }
});

toggleCard.addEventListener('change', function () {
  if (toggleCard.checked) {
    paymentByCash.classList.add('visually-hidden');
    paymentByCard.classList.remove('visually-hidden');
    cardInputs.forEach(function (element) {
      element.disabled = false;
    });
  }
});

// Выбор способа доставки

var toggleDeliverStore = document.querySelector('#deliver__store');
var toggleDeliverCourier = document.querySelector('#deliver__courier');
var deliverStore = document.querySelector('.deliver__store');
var deliverCourier = document.querySelector('.deliver__courier');
var deliverStoreInputs = deliverStore.querySelectorAll('.input-btn__input');
var deliverCourierInputs = deliverCourier.querySelectorAll('.text-input__input');

toggleDeliverStore.addEventListener('change', function () {
  if (toggleDeliverStore.checked) {
    deliverCourier.classList.add('visually-hidden');
    deliverStore.classList.remove('visually-hidden');
    deliverStoreInputs.forEach(function (element) {
      element.disabled = false;
    });
    deliverCourierInputs.forEach(function (element) {
      element.disabled = true;
    });
  }
});

toggleDeliverCourier.addEventListener('change', function () {
  if (toggleDeliverCourier.checked) {
    deliverStore.classList.add('visually-hidden');
    deliverCourier.classList.remove('visually-hidden');
    deliverCourierInputs.forEach(function (element) {
      element.disabled = false;
    });
    deliverStoreInputs.forEach(function (element) {
      element.disabled = true;
    });
  }
});

// Слайдер

var rangeFilter = document.querySelector('.range__filter');
var rangeButtonRight = document.querySelector('.range__btn--right');
var rangeButtonLeft = document.querySelector('.range__btn--left');
var rangePriceMax = document.querySelector('.range__price--max');
var rangePriceMin = document.querySelector('.range__price--min');

var deleteLastSymbol = function (str) {
  return str.substring(0, str.length - 1);
};

rangeFilter.addEventListener('mouseup', function (evt) {
  if (evt.target.classList.contains('range__btn--right')) {
    rangePriceMax.textContent = 100 - deleteLastSymbol(rangeButtonRight.style.right);
  } else if (evt.target.classList.contains('range__btn--left')) {
    rangePriceMin.textContent = deleteLastSymbol(rangeButtonLeft.style.left);
    if (rangePriceMin.textContent === '') {
      rangePriceMin.textContent = 0;
    }
  }
});

// Избранное

catalogCards.addEventListener('click', function (evt) {
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

var increaseOrderedNumber = function (searchedElement, objectInCart) {
  objectInCart.orderedAmount++;

  var cards = cardsHolder.querySelectorAll('.goods_card');
  for (var i = 0; i < cards.length; i++) {
    var cardTitle = cards[i].querySelector('.card-order__title');
    if (cardTitle.textContent === searchedElement) {
      var orderedNumber = cards[i].querySelector('.card-order__count');
      orderedNumber.value++;
    }
  }
};

var cardsEmpty = document.querySelector('.goods__card-empty');

catalogCards.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__btn')) {
    var currentProduct = evt.target.closest('.catalog__card');
    var productName = currentProduct.querySelector('.card__title').textContent;

    var isProductName = function (obj) {
      return obj.name === productName;
    };

    var objectInCatalog = goods.find(isProductName);
    if (objectInCatalog.amount > 0) {
      var productObject = copyObject(goods, productName);
      var modifiedObject = modifyObject(productObject);
      if (findObject(goodsInCart, productName)) {
        var objectInCart = goodsInCart.find(isProductName);
        increaseOrderedNumber(productName, objectInCart);
      } else {
        goodsInCartCreator(modifiedObject);
        goodsInCart.push(modifiedObject);

        checkCartText();
        cardsEmpty.classList.add('visually-hidden');
      }
      objectInCatalog.amount--;
    }
  }
});
