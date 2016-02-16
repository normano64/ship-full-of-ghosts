'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('SigninCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.signIn = function(username, password) {
      AccountSvc.signIn(username, password);
      console.log(username + ' has signed in!');
    };
  }]);