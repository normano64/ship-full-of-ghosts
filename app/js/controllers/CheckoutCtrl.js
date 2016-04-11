/**
* Controller used for the Checkout modal. 
*/
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('CheckoutCtrl', ['$scope', '$uibModalInstance', 'CartSvc', '$location', 'TranslateSvc', function($scope, $uibModalInstance, CartSvc, $location, TranslateSvc) {
      $scope.translation = TranslateSvc.translation;
      $scope.cart = CartSvc.getCart();

      $scope.totalPrice = CartSvc.getTotalPrice();

      $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.confirm = function() {
        CartSvc.clear();
        $location.path('/thankyou');
        $uibModalInstance.dismiss('cancel');
      };
    }]);
