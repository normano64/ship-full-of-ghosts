'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('ThankYouCtrl', ['$scope', 'AccountSvc', '$timeout', '$location', '$interval', function($scope, AccountSvc, $timeout, $location, $interval) {
    $scope.countdown = 5;

    $interval(function() {
      $scope.countdown --;
    }, 1000);

    $scope.user = AccountSvc.getUser();
    if ($scope.user.isSignedIn) {
      $scope.username = ' ' + 'some user I don\'t know';
    }

    $timeout(function() {
      $location.path('/');
    }, 5000);
  }]);