'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('DrinksInfoCtrl', [
      '$scope',
      '$http',
      '$uibModalInstance',
      'drinkId',
      function($scope, $http, $uibModalInstance, drinkId) {
        $http.get('js/drinks.json')
          .then(function(res) {
            var allItems = res.data.payload;
            allItems.forEach(function(item) {
              if (item.beer_id === drinkId) {
                $scope.drink = item;
              }
            });
          });
      }]);