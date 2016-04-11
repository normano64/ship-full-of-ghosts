/**
* Controller used for the Drinks information modal. 
*/
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('DrinksInfoCtrl', [
      '$scope',
      '$http',
      '$uibModalInstance',
      'drinkId',
      'CartSvc',
      'TranslateSvc',
      function($scope, $http, $uibModalInstance, drinkId, CartSvc, TranslateSvc) {
        $scope.translation = TranslateSvc.translation;

        // we need to grasp a copy of all the drinks information and store it for performance's sake
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
