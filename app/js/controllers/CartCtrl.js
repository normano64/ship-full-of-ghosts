'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('CartCtrl', ['$scope', 'AccountSvc', 'CartSvc', '$uibModal', function($scope, AccountSvc, CartSvc, $uibModal) {
    $scope.expandText = '◀';

    $scope.cart = CartSvc.getCart();

    $scope.toggleCart = function() {
      $scope.cart.isExpanded = !$scope.cart.isExpanded;
      $scope.expandText = $scope.cart.isExpanded ? '▶' : '◀';
    };

    $scope.increaseItem = CartSvc.increaseItem;
    $scope.decreaseItem = CartSvc.decreaseItem;
    $scope.redo = CartSvc.redo;
    $scope.undo = CartSvc.undo;

    $scope.user = AccountSvc.getUser();

    $scope.checkout = function() {
      var checkoutModal = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'checkout.html',
        controller: 'CheckoutCtrl'
      });
    };

    $scope.$watch('cart', function() {
      $scope.totalPrice = CartSvc.getTotalPrice();
    }, true);
  }]);