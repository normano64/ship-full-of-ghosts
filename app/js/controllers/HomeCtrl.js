'use strict';

angular
.module('shipFullOfGhosts.controllers')
.controller('HomeCtrl', [
	'$scope',
	'$http',
	'AccountSvc',
	'TranslateSvc',
	function($scope, $http, AccountSvc, TranslateSvc) {
	    $scope.translation = TranslateSvc.translation;
    }]);
