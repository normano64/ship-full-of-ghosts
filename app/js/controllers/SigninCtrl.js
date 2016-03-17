'use strict';

angular
.module('shipFullOfGhosts.controllers')
.controller('SigninCtrl', ['$scope', '$timeout', 'AccountSvc', 'TranslateSvc', function($scope, $timeout, AccountSvc, TranslateSvc) {
  $scope.signIn = function(username, password) {
    AccountSvc.signIn(username, password);
    console.log(username + ' has signed in!');
  };
  $scope.translation = TranslateSvc.translation;

  $scope.showWrong = false;
  $scope.$timeout = $timeout;
  $scope.show = function() {
    $scope.showWrong=true;
  }
}]);
