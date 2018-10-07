'use strict';

(function () {
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

      var rangePriceMax = document.querySelector('.range__price--max');
      var rangePriceMin = document.querySelector('.range__price--min');

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

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  dragPriceButton(rangeButtonLeft, rangeButtonRight);
  dragPriceButton(rangeButtonRight, rangeButtonLeft);
})();
