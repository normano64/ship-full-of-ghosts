'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('ProductsCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.user = AccountSvc.getUser();

    $scope.items = [
      {
        id: 0,
        name: 'Brooklyn',
        price: 79
      },
      {
        id: 1,
        name: 'Chimay blå',
        price: 27.9
      },
      {
        id: 2,
        name: 'Thai',
        price: 57
      },
      {
        id: 3,
        name: 'Kyckling Med',
        price: 420
      },
      {
        id: 4,
        name: 'Thai Broileri',
        price: 10
      },
      {
        id: 5,
        name: 'Ayam',
        price: 100
      }
    ];
  }]);
