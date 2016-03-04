'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('CartCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.isExpanded = false;
    $scope.expandText = '◀';

    $scope.items = [
      {
        id: 0,
        name: 'Brooklyn',
        price: 79,
        quantity: 1
      },
      {
        id: 1,
        name: 'Chimay blå',
        price: 27.9,
        quantity: 3
      },
      {
        id: 2,
        name: 'Thai',
        price: 57,
        quantity: 1
      },
      {
        id: 3,
        name: 'Kyckling Med',
        price: 420,
        quantity: 2
      },
      {
        id: 4,
        name: 'Thai Broileri',
        price: 10,
        quantity: 1
      }
    ];

    $scope.toggleCart = function() {
      $scope.isExpanded = !$scope.isExpanded;
      $scope.expandText = $scope.isExpanded ? '▶' : '◀';
    }

    $scope.user = AccountSvc.getUser();
  }]);