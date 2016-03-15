'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('CheckoutCtrl', ['$scope', '$uibModalInstance', 'CartSvc', '$location', function($scope, $uibModalInstance, CartSvc, $location) {
      $scope.cart = CartSvc.getCart();

      $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.confirm = function() {
        CartSvc.clear();
        $location.path('/thankyou');
        $uibModalInstance.dismiss('cancel');
      };
    }]);