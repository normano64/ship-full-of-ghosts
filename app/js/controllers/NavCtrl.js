'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('NavCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.signOut = function() {
      AccountSvc.signOut();
    };

    $scope.user = AccountSvc.getUser();
  }]);