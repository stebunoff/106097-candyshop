'use strict';

var classConst = {
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
  EMPTY_CART: '.goods__card-empty'
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

var catalogCards = document.querySelector(classConst.CATALOG_CARDS);
var catalogLoad = document.querySelector(classConst.CATALOG_LOAD);

var goodsCreator = function (array) {
  var template = document.querySelector(classConst.CARD).content.querySelector(classConst.CATALOG_CARD);
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

    var cardTitle = newCard.querySelector(classConst.CARD_TITLE);
    cardTitle.textContent = array[i].name;

    var cardImg = newCard.querySelector(classConst.CARD_IMG);
    cardImg.src = array[i].picture;
    cardImg.alt = array[i].name;

    var cardPrice = newCard.querySelector(classConst.CARD_PRICE);
    cardPrice.innerHTML = array[i].price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + array[i].weight + ' Г</span>';

    var cardRaiting = newCard.querySelector(classConst.STARS_RAITING);
    cardRaiting.classList.add = generateTextRaiting(array[i].rating.value);

    var starCount = newCard.querySelector(classConst.STAR_COUNT);
    starCount.textContent = '(' + array[i].rating.number + ')';

    var cardCharacteristic = newCard.querySelector(classConst.CARD_CHAR);
    if (array[i].nutritionFacts.sugar) {
      cardCharacteristic.textContent = 'Содержит сахар. ' + array[i].nutritionFacts.energy + ' ккал';
    } else {
      cardCharacteristic.textContent = 'Без сахара. ' + array[i].nutritionFacts.energy + ' ккал';
    }

    var cardComposition = newCard.querySelector(classConst.CARD_COMPOSITION);
    cardComposition.textContent = array[i].nutritionFacts.contents;

    fragment.appendChild(newCard);
  }

  catalogCards.appendChild(fragment);


  catalogCards.classList.remove('catalog__cards--load');
  catalogLoad.classList.add(classConst.VISUALLY_HIDDEN);
};

goodsCreator(goods);

var cardsHolder = document.querySelector(classConst.GOODS_CARDS);
cardsHolder.classList.remove('goods__cards--empty');

// Управление формой заказа в зависимости от наличия товаров в корзине

var contactData = document.querySelector(classConst.CONTACT_INPUTS);
var contactDataInputs = contactData.querySelectorAll(classConst.TEXT_INPUT);

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

var headerBasket = document.querySelector(classConst.HEADER_BASKET);

var checkCartText = function () {
  if (goodsInCart.length > 0) {
    headerBasket.textContent = 'В корзине товаров: ' + goodsInCart.length;
  } else if (goodsInCart.length === 0) {
    headerBasket.textContent = 'В корзине ничего нет';
  }
};

var deleteProduct = function (evt) {
  var targetProduct = evt.target.closest(classConst.GOODS_CARD);
  var targetProductName = targetProduct.querySelector(classConst.CARD_ORDER_TITLE).textContent;
  targetProduct.remove();

  for (var i = 0; i < goodsInCart.length; i++) {
    if (goodsInCart[i].name === targetProductName) {
      goodsInCart.splice(i - 1, 1);
    }
  }

  checkCartText();

  if (cardsHolder.querySelector(classConst.GOODS_CARD) === null) {
    cardsEmpty.classList.remove(classConst.VISUALLY_HIDDEN);
  }
};

var increaseOrderedNumber = function (searchedElement, objectInCart) {
  objectInCart.orderedAmount++;

  var cards = cardsHolder.querySelectorAll(classConst.GOODS_CARD);
  for (var i = 0; i < cards.length; i++) {
    var cardTitle = cards[i].querySelector(classConst.CARD_ORDER_TITLE);
    if (cardTitle.textContent === searchedElement) {
      var orderedNumber = cards[i].querySelector(classConst.ORDERED_NUMBER);
      orderedNumber.value++;
    }
  }
};

var goodsInCartCreator = function (obj) {
  var template = document.querySelector('#card-order').content.querySelector(classConst.GOODS_CARD);
  var fragment = document.createDocumentFragment();

  var newCard = template.cloneNode(true);

  var cardInCartTitle = newCard.querySelector(classConst.CARD_ORDER_TITLE);
  cardInCartTitle.textContent = obj.name;

  var cardInCartPrice = newCard.querySelector(classConst.CARD_ORDER_PRICE);
  cardInCartPrice.textContent = obj.price + ' ₽';

  var cardInCartImg = newCard.querySelector(classConst.CARD_ORDER_IMG);
  cardInCartImg.src = obj.picture;
  cardInCartImg.alt = obj.name;

  var cardInCartAmount = newCard.querySelector(classConst.ORDERED_NUMBER);
  cardInCartAmount.value = 1;

  var deleteCardInCart = newCard.querySelector(classConst.CARD_CLOSE);
  deleteCardInCart.addEventListener('click', function (evt) {
    deleteProduct(evt);
    if (goodsInCart.length === 0) {
      disableCheckout();
    }
  });

  var increaseButton = newCard.querySelector(classConst.INCREASE_BTN);
  increaseButton.addEventListener('click', function (evt) {
    var currentProduct = evt.target.closest(classConst.GOODS_CARD);
    var productName = currentProduct.querySelector(classConst.CARD_ORDER_TITLE).textContent;

    var isProductName = function (object) {
      return object.name === productName;
    };

    var objectInCatalog = goods.find(isProductName);
    if (objectInCatalog.amount > 0) {
      objectInCatalog.amount--;
      var objectInCart = goodsInCart.find(isProductName);
      increaseOrderedNumber(productName, objectInCart);
    }
  });

  var decreaseButton = newCard.querySelector(classConst.DECREASE_BTN);
  decreaseButton.addEventListener('click', function (evt) {
    var currentProduct = evt.target.closest(classConst.GOODS_CARD);
    var productName = currentProduct.querySelector(classConst.CARD_ORDER_TITLE).textContent;

    var isProductName = function (object) {
      return object.name === productName;
    };

    var objectInCatalog = goods.find(isProductName);

    var productAmountLabel = evt.target.closest(classConst.CARD_ORDER_AMOUNT);
    var productCount = productAmountLabel.querySelector(classConst.ORDERED_NUMBER);
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

  cardsHolder.appendChild(fragment);
  enableCheckout();
};

// Выбор способа оплаты

var toggleCash = document.querySelector(classConst.PAYMENT_CASH);
var toggleCard = document.querySelector(classConst.PAYMENT_CARD);
var paymentByCash = document.querySelector(classConst.PAYMENT_CASH_WRAP);
var paymentByCard = document.querySelector(classConst.PAYMENT_CARD_WRAP);
var cardInputs = paymentByCard.querySelectorAll(classConst.TEXT_INPUT);

toggleCash.addEventListener('change', function () {
  if (toggleCash.checked) {
    paymentByCard.classList.add(classConst.VISUALLY_HIDDEN);
    paymentByCash.classList.remove(classConst.VISUALLY_HIDDEN);
    cardInputs.forEach(function (element) {
      element.disabled = true;
    });
  }
});

toggleCard.addEventListener('change', function () {
  if (toggleCard.checked) {
    paymentByCash.classList.add(classConst.VISUALLY_HIDDEN);
    paymentByCard.classList.remove(classConst.VISUALLY_HIDDEN);
    cardInputs.forEach(function (element) {
      element.disabled = false;
    });
  }
});

// Выбор способа доставки

var toggleDeliverStore = document.querySelector('#deliver__store');
var toggleDeliverCourier = document.querySelector('#deliver__courier');
var deliverStore = document.querySelector(classConst.DELIVER_STORE);
var deliverCourier = document.querySelector(classConst.DELIVER_COURIER);
var deliverStoreInputs = deliverStore.querySelectorAll(classConst.BTN_INPUT);
var deliverCourierInputs = deliverCourier.querySelectorAll(classConst.TEX_TINPUT);

toggleDeliverStore.addEventListener('change', function () {
  if (toggleDeliverStore.checked) {
    deliverCourier.classList.add(classConst.VISUALLY_HIDDEN);
    deliverStore.classList.remove(classConst.VISUALLY_HIDDEN);
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
    deliverStore.classList.add(classConst.VISUALLY_HIDDEN);
    deliverCourier.classList.remove(classConst.VISUALLY_HIDDEN);
    deliverCourierInputs.forEach(function (element) {
      element.disabled = false;
    });
    deliverStoreInputs.forEach(function (element) {
      element.disabled = true;
    });
  }
});

// Слайдер

var rangeFilter = document.querySelector(classConst.RANGE_FILTER);
var rangeButtonRight = document.querySelector(classConst.RANGE_BTN_RIGHT);
var rangeButtonLeft = document.querySelector(classConst.RANGE_BTN_LEFT);
var rangePriceMax = document.querySelector(classConst.RANGE_PRICE_MAX);
var rangePriceMin = document.querySelector(classConst.RANGE_PRICE_MIN);

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

var cardsEmpty = document.querySelector(classConst.EMPTY_CART);

catalogCards.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__btn')) {
    var currentProduct = evt.target.closest(classConst.CATALOG_CARD);
    var productName = currentProduct.querySelector(classConst.CARD_TITLE).textContent;

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
        cardsEmpty.classList.add(classConst.VISUALLY_HIDDEN);
      }
      objectInCatalog.amount--;
    }
  }
});

// Проверка полей ввода

var cardStatus = document.querySelector('.payment__card-status');

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
  return Boolean(!(summ % 10))
};

var validate = function (fields) {
  var validationStatus = [];
  fields.forEach(function (element) {
    if (!element.value) {
      validationStatus.push(false);
    } else if (element.name === 'card-number') {
      validationStatus.push(validateByLuna(element.value));
    }
  });
  console.log(validationStatus);
  for (var i = 0; i < validationStatus.length;i++) {
    if (!validationStatus[i]) {
      return false;
      break;
    }
  }
  return true;
};

for (var i = 0; i < cardInputs.length; i++) {
  cardInputs[i].addEventListener('change', function () {
    console.log(validate(cardInputs));
    if (validate(cardInputs)) {
      cardStatus.textContent = 'Одобрен';
    } else {
      cardStatus.textContent = 'Неизвестен';
    }
  });
};
