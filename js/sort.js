'use strict';

(function () {

  var sorting = document.querySelector('.sorting');

  var sortPopularityFromLtoS = function (a, b) {
    if (a.rating.number < b.rating.number) {
      return 1;
    }
    if (a.rating.number > b.rating.number) {
      return -1;
    }
    return 0;
  };

  var sortRatingFromLtoS = function (a, b) {
    if (a.rating.value < b.rating.value) {
      return 1;
    }
    if (a.rating.value > b.rating.value) {
      return -1;
    }
    return 0;
  };

  var sortPriceFromLtoS = function (a, b) {
    if (a.price < b.price) {
      return 1;
    }
    if (a.price > b.price) {
      return -1;
    }
    return 0;
  };

  var sortPriceFromStoL = function (a, b) {
    if (a.price > b.price) {
      return 1;
    }
    if (a.price < b.price) {
      return -1;
    }
    return 0;
  };

  sorting.addEventListener('change', function (evt) {
    if (evt.target.value === 'popular') {
      window.goods.sort(sortPopularityFromLtoS);
    } else if (evt.target.value === 'expensive') {
      window.goods.sort(sortPriceFromLtoS);
    } else if (evt.target.value === 'cheep') {
      window.goods.sort(sortPriceFromStoL);
    } else if (evt.target.value === 'rating') {
      window.goods.sort(sortRatingFromLtoS);
    }
    window.data.other.catalogCards.innerHTML = '';
    window.data.goodsCreator(window.goods);
  });
})();
