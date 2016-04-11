/**
* Controller used for the Cart component. 
* handling the interaction between the view and the cart service
*/

'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('CartCtrl', ['$scope', 'AccountSvc', 'CartSvc', '$uibModal', 'TranslateSvc', function($scope, AccountSvc, CartSvc, $uibModal, TranslateSvc) {
    $scope.translation = TranslateSvc.translation;
    $scope.expandText = '◀';

    $scope.cart = CartSvc.getCart();

    // this method is used for show and hide the cart from the side menu
    $scope.toggleCart = function() {
      $scope.cart.isExpanded = !$scope.cart.isExpanded;
      $scope.expandText = $scope.cart.isExpanded ? '▶' : '◀';
    };

    $scope.increaseItem = CartSvc.increaseItem;
    $scope.decreaseItem = CartSvc.decreaseItem;
    $scope.redo = CartSvc.redo;
    $scope.undo = CartSvc.undo;

    $scope.user = AccountSvc.getUser();

    // checkout method, opening a new modal for handling the checkout procedure
    $scope.checkout = function() {
      var checkoutModal = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'checkout.html',
        controller: 'CheckoutCtrl'
      });
    };

    // once the cart is changed, we need to update the total price
    $scope.$watch('cart', function() {
      $scope.totalPrice = CartSvc.getTotalPrice();
    }, true);
  }]);
