'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('CartCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.isExpanded = false;
    $scope.expandText = '◀';

    $scope.toggleCart = function() {
      $scope.isExpanded = !$scope.isExpanded;
      $scope.expandText = $scope.isExpanded ? '▶' : '◀';
    }

    $scope.user = AccountSvc.getUser();
  }]);