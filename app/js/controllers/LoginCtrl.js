'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('LoginCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.signin = function(username, password) {
      console.log(username + ' has signed in!');
    };
  }]);