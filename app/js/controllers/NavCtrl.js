'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('NavCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.signOut = function() {
      console.log('sign out');
    };

    $scope.user = AccountSvc.getUser();
  }]);