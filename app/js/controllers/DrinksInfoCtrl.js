'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('DrinksInfoCtrl', [
      '$scope',
      '$http',
      '$uibModalInstance',
      'drinkId',
      'CartSvc',
      function($scope, $http, $uibModalInstance, drinkId, CartSvc) {
        $http.get('js/drinks.json')
          .then(function(res) {
            var allItems = res.data.payload;
            allItems.forEach(function(item) {
              if (item.beer_id === drinkId) {
                $scope.drink = item;
              }
            });
          });

        $scope.close = function() {
          $uibModalInstance.dismiss('cancel');
        };

        $scope.buy = function() {
          CartSvc.addItem(drinkId);
          $uibModalInstance.dismiss('cancel');
        };
      }]);