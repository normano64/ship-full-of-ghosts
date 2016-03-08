'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('CartCtrl', ['$scope', 'AccountSvc', 'CartSvc', function($scope, AccountSvc, CartSvc) {
    $scope.isExpanded = false;
    $scope.expandText = '◀';

    $scope.items = CartSvc.getCart();

    $scope.toggleCart = function() {
      $scope.isExpanded = !$scope.isExpanded;
      $scope.expandText = $scope.isExpanded ? '▶' : '◀';
    };

    $scope.increaseItem = CartSvc.increaseItem;
    $scope.decreaseItem = CartSvc.decreaseItem;

    $scope.user = AccountSvc.getUser();
  }]);