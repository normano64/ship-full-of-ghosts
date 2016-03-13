'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('SigninCtrl', ['$scope', 'AccountSvc', 'TranslateSvc', function($scope, AccountSvc, TranslateSvc) {
    $scope.signIn = function(username, password) {
      AccountSvc.signIn(username, password);
      console.log(username + ' has signed in!');
    };
    $scope.wordsList = TranslateSvc.wordsList;
  }]);