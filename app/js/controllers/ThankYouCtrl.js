/**
* Controller used for the "Thank you page". Declares the necessary variables.
*/
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('ThankYouCtrl', ['$scope', 'AccountSvc', '$timeout', '$location', '$interval', 'TranslateSvc', function($scope, AccountSvc, $timeout, $location, $interval, TranslateSvc) {
    $scope.translation = TranslateSvc.translation;
    $scope.countdown = 5;

    $interval(function() {
      $scope.countdown --;
    }, 1000);

    $scope.user = AccountSvc.getUser();
    if ($scope.user.isSignedIn) {
      $scope.username = 'some user I don\'t know';
    }

    $timeout(function() {
      $location.path('/');
    }, 5000);
  }]);
