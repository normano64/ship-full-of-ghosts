'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('CheckoutCtrl', [
      '$scope',
      '$uibModalInstance',
      'CartSvc',
      function($scope, $uibModalInstance, CartSvc) {
        $scope.cart = CartSvc.getCart();

        $scope.close = function() {
          $uibModalInstance.dismiss('cancel');
        };

        $scope.confirm = function() {
          $uibModalInstance.dismiss('cancel');
        };
      }]);