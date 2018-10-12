'use strict';

(function () {

  // Фильтры
  var deleteChildren = function (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var catalogSidebar = document.querySelector('.catalog__sidebar');

  // Фильтр по цене

  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');

  var filterByPrice = function (element, priceMin, priceMax) {
    var priceCheck = true;
    priceCheck = (element.price >= priceMin) && (element.price <= priceMax);
    return priceCheck;
  };

  var foodTypeFilter = function (el, condition) {
    var conditionCheck;
    if (condition === 'Мороженое') {
      conditionCheck = (el.kind === 'Мороженое');
    } else if (condition === 'Газировка') {
      conditionCheck = (el.kind === 'Газировка');
    } else if (condition === 'Жевательная резинка') {
      conditionCheck = (el.kind === 'Жевательная резинка');
    } else if (condition === 'Мармелад') {
      conditionCheck = (el.kind === 'Жевательная резинка');
    } else if (condition === 'Зефир') {
      conditionCheck = (el.kind === 'Зефир');
    }
    return conditionCheck;
  };

  var filterByFoodType = function (elem) {
    var typeInputs = catalogSidebar.querySelectorAll('input[name="food-type"]');
    var inputsCheckResult = true;
    typeInputs.forEach(function (input) {
      if (input.checked) {
        switch (input.value) {
          case 'icecream':
            inputsCheckResult = foodTypeFilter(elem, 'Мороженое');
            break;
          case 'soda':
            inputsCheckResult = foodTypeFilter(elem, 'Газировка');
            break;
          case 'gum':
            inputsCheckResult = foodTypeFilter(elem, 'Жевательная резинка');
            break;
          case 'marmalade':
            inputsCheckResult = foodTypeFilter(elem, 'Мармелад');
            break;
          case 'marshmallows':
            inputsCheckResult = foodTypeFilter(elem, 'Зефир');
        }
      }
    });
    return inputsCheckResult;
  };

  var foodPropertyFilter = function (el, condition) {
    var conditionCheck;
    if (condition === 'vegetarian') {
      conditionCheck = el.nutritionFacts.vegetarian;
    } else if (condition === 'shugar') {
      conditionCheck = !(el.nutritionFacts.shugar);
    } else if (condition === 'gluten') {
      conditionCheck = el.nutritionFacts.gluten;
    }
    return conditionCheck;
  };

  var filterByFoodProperty = function (elem) {
    var propertyInputs = catalogSidebar.querySelectorAll('input[name="food-property"]');
    var inputsCheckResult = true;
    propertyInputs.forEach(function (input) {
      if (input.checked) {
        switch (input.value) {
          case 'sugar-free':
            inputsCheckResult = foodPropertyFilter(elem, 'shugar');
            break;
          case 'vegetarian':
            inputsCheckResult = foodPropertyFilter(elem, 'vegetarian');
            break;
          case 'gluten-free':
            inputsCheckResult = foodPropertyFilter(elem, 'gluten');
        }
      }
    });
    return inputsCheckResult;
  };

  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function (fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var renderMessage = function () {
    var template = document.querySelector('#empty-filters').content;
    var message = template.cloneNode(true);
    window.data.other.catalogCards.appendChild(message);
  };

  var onFiltersChange = function (evt) {
    if (!(evt.target.value === 'favorite') && !(evt.target.value === 'availability')) {
      var filter = window.goods.filter(function (element) {
        return (filterByFoodProperty(element) && filterByFoodType(element) && filterByPrice(element, rangePriceMin.textContent, rangePriceMax.textContent));
      });
      deleteChildren(window.data.other.catalogCards);
      var uniqueGoods = filter.filter(function (it, i) {
        return filter.indexOf(it) === i;
      });
      if (uniqueGoods.length === 0) {
        renderMessage();
      }
      window.debounce(window.data.goodsCreator(uniqueGoods));
    }
  };

  catalogSidebar.addEventListener('change', onFiltersChange);

  var rangeButtonLeft = 'range__btn--left';
  var rangeButtonRight = 'range__btn--right';
  var rangeFillLine = document.querySelector('.range__fill-line');

  var deleteLastSymbol = function (str) {
    return str.substring(0, str.length - 1);
  };

  var dragPriceButton = function (className, classNameForRestriction) {
    var draggerClass = '.' + className;
    var priceButton = document.querySelector(draggerClass);
    var buttonWidth = priceButton.clientWidth;
    var buttonParent = priceButton.parentElement;
    var buttonParentWidth = buttonParent.clientWidth;

    var restrictClass = '.' + classNameForRestriction;
    var anotherControl = document.querySelector(restrictClass);

    var getParentCoords = buttonParent.getBoundingClientRect();
    var getRestrictionCoords = anotherControl.getBoundingClientRect();

    var calculateRangeStyle = function (evt) {
      var shift = evt.clientX - getParentCoords.left - buttonWidth / 2;

      var restrictionsLeftButton = function () {
        if (evt.clientX - getParentCoords.left <= 0) {
          priceButton.style.left = '0%';
          rangeFillLine.style.left = '0.2%';
        } else if (evt.clientX > getRestrictionCoords.left - 0.5 * buttonWidth) {
          priceButton.style.left = getRestrictionCoords.left - 0.5 * buttonWidth;
          rangeFillLine.style.left = getRestrictionCoords.left;
        } else {
          priceButton.style.left = shift * 100 / buttonParentWidth + '%';
          rangeFillLine.style.left = (shift + 0.5 * buttonWidth) * 100 / buttonParentWidth + '%';
        }
      };

      var restrictionsRightButton = function () {
        if (evt.clientX - 1.5 * buttonWidth < getRestrictionCoords.right) {
          priceButton.style.right = getRestrictionCoords.right + 1.5 * buttonWidth;
          rangeFillLine.style.right = getRestrictionCoords.right + 1.5 * buttonWidth;
        } else if (evt.clientX > getParentCoords.right) {
          priceButton.style.right = '0%';
          rangeFillLine.style.right = '0.2%';
        } else {
          priceButton.style.right = (buttonParentWidth - shift - buttonWidth) * 100 / buttonParentWidth + '%';
          rangeFillLine.style.right = (buttonParentWidth - shift - 0.5 * buttonWidth) * 100 / buttonParentWidth + '%';
        }
      };

      if (className === 'range__btn--left') {
        restrictionsLeftButton();
      } else if (className === 'range__btn--right') {
        restrictionsRightButton();
      }
    };

    priceButton.addEventListener('mousedown', function () {
      var onMouseMove = function (moveevt) {
        calculateRangeStyle(moveevt);
      };

      var onMouseUp = function (upEvt) {
        calculateRangeStyle(upEvt);

        if (className === 'range__btn--right') {
          rangePriceMax.textContent = Math.round(100 - deleteLastSymbol(priceButton.style.right));
        } else if (className === 'range__btn--left') {
          rangePriceMin.textContent = Math.round(deleteLastSymbol(priceButton.style.left));
          if (rangePriceMin.textContent === '') {
            rangePriceMin.textContent = 0;
          }
        }
        onFiltersChange(upEvt);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  dragPriceButton(rangeButtonLeft, rangeButtonRight);
  dragPriceButton(rangeButtonRight, rangeButtonLeft);

  // FFFFF

  // Подсчёт количества товаров для фильтров

  var itemCounts = document.querySelectorAll('.input-btn__item-count');
  itemCounts.forEach(function (element) {
    var inputBtn = element.closest('.input-btn');
    var input = inputBtn.querySelector('.input-btn__input');
    var inputValue = input.value;
    var searchedProperty;
    switch (inputValue) {
      case 'icecream':
        searchedProperty = 'Мороженое';
        break;
      case 'soda':
        searchedProperty = 'Газировка';
        break;
      case 'gum':
        searchedProperty = 'Жевательная резинка';
        break;
      case 'marmalade':
        searchedProperty = 'Мармелад';
        break;
      case 'marshmallows':
        searchedProperty = 'Зефир';
        break;
      case 'sugar-free':
        searchedProperty = 'false';
        break;
      case 'vegetarian':
        searchedProperty = 'true';
        break;
      case 'gluten-free':
        searchedProperty = 'false';
        break;
      case 'favorite':
        searchedProperty = 'favorite';
        break;
      case 'availability':
        searchedProperty = 'availability';
    }

    var number = 0;
    if (input.name === 'food-type') {
      window.goods.forEach(function (el) {
        if (el.kind === searchedProperty) {
          number++;
        }
      });
    }

    if (input.name === 'food-property') {
      if (inputValue === 'sugar-free') {
        window.goods.forEach(function (el) {
          if (el.nutritionFacts.shugar === searchedProperty) {
            number++;
          }
        });
      } else if (inputValue === 'gluten-free') {
        window.goods.forEach(function (el) {
          if (el.nutritionFacts.gluten === searchedProperty) {
            number++;
          }
        });
      } else if (inputValue === 'vegetarian') {
        window.goods.forEach(function (el) {
          if (el.nutritionFacts.vegetarian === searchedProperty) {
            number++;
          }
        });
      }
    }

    if (inputValue === 'favorite') {
      number = window.favorite.length;
    }

    if (inputValue === 'availability') {
      window.goods.forEach(function (el) {
        if (el.amount > 0) {
          number++;
        }
      });
    }

    element.textContent = number;
  });

  // Фильтр на избранное

  var filterFavorite = document.querySelector('#filter-favorite');
  filterFavorite.addEventListener('change', function () {
    deleteChildren(window.data.other.catalogCards);
    var uniqueGoods = window.favorite.filter(function (it, i) {
      return window.favorite.indexOf(it) === i;
    });
    console.log(uniqueGoods);
    if (uniqueGoods.length === 0) {
      renderMessage();
    }
    window.data.goodsCreator(uniqueGoods);
  });

  // Фильтр на наличие

  var filterAvailable = document.querySelector('#filter-availability');
  filterAvailable.addEventListener('change', function () {
    deleteChildren(window.data.other.catalogCards);
    var filteredItems = window.goods.filter(function (it) {
      return it.amount > 0;
    });
    window.data.goodsCreator(filteredItems);
  });

  // Сброс фильтров по нажатию на "Показать всё"

  var showAllButton = document.querySelector('.catalog__submit');

  var onShowAllClick = function (evt) {
    deleteChildren(window.data.other.catalogCards);
    window.data.goodsCreator(window.goods);
    evt.preventDefault();
  };

  showAllButton.addEventListener('click', onShowAllClick);
})();
