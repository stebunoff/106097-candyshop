'use strict';

(function () {

  var catalogSidebar = document.querySelector('.catalog__sidebar');

  // Фильтр по цене

  var rangePriceMin = document.querySelector('.range__price--min');
  var rangePriceMax = document.querySelector('.range__price--max');

  var checkFoodProperty = function (el, condition) {
    var conditionCheck;
    if (condition === 'vegetarian') {
      conditionCheck = el.nutritionFacts.vegetarian;
    } else if (condition === 'sugar') {
      conditionCheck = !(el.nutritionFacts.sugar);
    } else if (condition === 'gluten') {
      conditionCheck = !(el.nutritionFacts.gluten);
    }
    return conditionCheck;
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
  window.filterCounters = function (goods, field) {
    return goods.map(function (item) {
      return {
        name: item[field],
        count: 1
      };
    }).reduce(function (acc, item) {
      acc[item.name] = !acc[item.name] ? 1 : acc[item.name] + 1;
      return acc;
    }, {});
  };

  window.filterNutritions = function (goods) {
    var fields = [{
      name: 'sugar',
      condition: function (value) {
        return !value;
      }
    }, {
      name: 'gluten',
      condition: function (value) {
        return !value;
      }
    }, {
      name: 'vegetarian',
      condition: function (value) {
        return value;
      }
    }];
    return fields.map(function (field) {
      return {
        name: field.name,
        count: goods.filter(function (item) {
          return field.condition(item.nutritionFacts[field.name]);
        }).length
      };
    });
  };

  window.filterInStock = function (goods) {
    var inStock = goods.filter(function (item) {
      if (item.amount !== 0) {
        return item.amount;
      }
      return false;
    }).length;

    return {
      availability: inStock
    };
  };

  // Фильтр на избранное

  var filterFavorite = document.querySelector('#filter-favorite');
  filterFavorite.addEventListener('change', function () {
    window.favorite = window.goods.filter(function (item) {
      return item.favorite === true;
    });
    window.data.other.catalogCards.innerHTML = '';
    if (window.favorite.length === 0) {
      renderMessage();
    }
    window.data.goodsCreator(window.favorite);
  });

  // Фильтр на наличие

  var filterAvailable = document.querySelector('#filter-availability');
  filterAvailable.addEventListener('change', function () {
    window.data.other.catalogCards.innerHTML = '';
    var filteredItems = window.goods.filter(function (it) {
      return it.amount > 0;
    });
    window.data.goodsCreator(filteredItems);
  });

  // Сброс фильтров по нажатию на "Показать всё"

  var showAllButton = document.querySelector('.catalog__submit');
  var priceButtonLeft = document.querySelector('.range__btn--left');
  var priceButtonRight = document.querySelector('.range__btn--right');

  var onShowAllClick = function (evt) {
    window.data.other.catalogCards.innerHTML = '';
    window.data.goodsCreator(window.goods);

    var typeInputs = catalogSidebar.querySelectorAll('input[name="food-type"]');
    typeInputs.forEach(function (input) {
      input.checked = false;
    });

    var propertyInputs = catalogSidebar.querySelectorAll('input[name="food-property"]');
    propertyInputs.forEach(function (input) {
      input.checked = false;
    });

    priceButtonLeft.style.left = '0%';
    rangeFillLine.style.left = '0.2%';
    priceButtonRight.style.right = '0%';
    rangeFillLine.style.right = '0.2%';
    rangePriceMin.textContent = 0;
    rangePriceMax.textContent = 100;

    filterFavorite.checked = false;
    filterAvailable.checked = false;

    evt.preventDefault();
  };

  showAllButton.addEventListener('click', onShowAllClick);

  // **
  var filters = [];

  var modifyCondition = function (condition) {
    switch (condition) {
      case 'icecream':
        return 'Мороженое';
      case 'soda':
        return 'Газировка';
      case 'gum':
        return 'Жевательная резинка';
      case 'marmalade':
        return 'Мармелад';
      case 'marshmallows':
        return 'Зефир';
    }
    return true;
  };

  var filterProducts = function (goods) {
    var propertyFilters = filters.filter(function (filter) {
      return filter.type === 'food-property';
    });
    var typeFilters = filters.filter(function (filter) {
      return filter.type === 'food-type';
    });
    var filtered = goods;
    if (typeFilters.length > 0) {
      filtered = filtered.filter(function (item) {
        return typeFilters.filter(function (filter) {
          return item.kind === modifyCondition(filter.value);
        }).length;
      });
    }
    if (propertyFilters.length > 0) {
      filtered = filtered.filter(function (item) {
        return propertyFilters.filter(function (filter) {
          return checkFoodProperty(item, filter.value);
        }).length;
      });
    }
    var pricemin = rangePriceMin.textContent;
    var pricemax = rangePriceMax.textContent;
    filtered = filtered.filter(function (item) {
      return (item.price > pricemin && item.price < pricemax);
    });
    return filtered;
  };

  var onFiltersChange = function (evt) {
    if (evt.target.checked === true) {
      filters.push({
        type: evt.target.name,
        value: evt.target.value
      });
    } else {
      var item = filters.find(function (element) {
        return element.name === evt.target.name && element.value === evt.target.value;
      });
      filters.splice(filters.indexOf(item));
    }
    var filteredGoods = filterProducts(window.goods);
    window.data.other.catalogCards.innerHTML = '';
    if (filteredGoods.length === 0) {
      renderMessage();
    } else {
      window.debounce(window.data.goodsCreator(filteredGoods));
    }
  };

  var typeInputs = catalogSidebar.querySelectorAll('input[name="food-type"]');
  var propertyInputs = catalogSidebar.querySelectorAll('input[name="food-property"]');

  typeInputs.forEach(function (element) {
    element.addEventListener('change', onFiltersChange);
  });

  propertyInputs.forEach(function (element) {
    element.addEventListener('change', onFiltersChange);
  });


  // **

})();
