'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('ProductsCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.user = AccountSvc.getUser();
  }]);
