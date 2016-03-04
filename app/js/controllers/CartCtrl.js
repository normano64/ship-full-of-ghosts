'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('CartCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.isExpanded = false;
    $scope.expandText = '◀';

    $scope.items = {
      0: {
        id: 0,
        name: 'Brooklyn',
        price: 79,
        quantity: 1
      },
      1: {
        id: 1,
        name: 'Chimay blå',
        price: 27.9,
        quantity: 3
      },
      2: {
        id: 2,
        name: 'Thai',
        price: 57,
        quantity: 1
      },
      3: {
        id: 3,
        name: 'Kyckling Med',
        price: 420,
        quantity: 2
      },
      4: {
        id: 4,
        name: 'Thai Broileri',
        price: 10,
        quantity: 1
      }
    };

    $scope.toggleCart = function() {
      $scope.isExpanded = !$scope.isExpanded;
      $scope.expandText = $scope.isExpanded ? '▶' : '◀';
    };

    $scope.increaseItem = function(id) {
      if (typeof $scope.items[id] === 'undefined') {
        console.log('something goes wrong, no changing anything...');
      } else {
        $scope.items[id].quantity ++;
      }
    }

    $scope.decreaseItem = function(id) {
      if (typeof $scope.items[id] === 'undefined') {
        console.log('something goes wrong, no changing anything...');
      } else {
        if (!(-- $scope.items[id].quantity)) {
          // remove it from the cart
          $scope.items[id] = undefined;
        }
      }
    }

    $scope.user = AccountSvc.getUser();
  }]);