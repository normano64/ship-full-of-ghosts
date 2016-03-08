'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('CartCtrl', ['$scope', 'AccountSvc', 'CartSvc', function($scope, AccountSvc, CartSvc) {
    $scope.expandText = '◀';

    $scope.cart = CartSvc.getCart();

    $scope.toggleCart = function() {
      $scope.cart.isExpanded = !$scope.cart.isExpanded;
      $scope.expandText = $scope.isExpanded ? '▶' : '◀';
    };

    $scope.increaseItem = CartSvc.increaseItem;
    $scope.decreaseItem = CartSvc.decreaseItem;

    $scope.user = AccountSvc.getUser();
  }]);