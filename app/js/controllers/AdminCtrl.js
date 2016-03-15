'use strict';

angular
.module('shipFullOfGhosts.controllers')
.controller('AdminCtrl', [
	'$scope',
	'$http',
	'AdminSvc',
	'TranslateSvc',
	function($scope, $http, AdminSvc, TranslateSvc) {
		$scope.stock = AdminSvc.getStock();
		$scope.increase = function(id, amount){
			AdminSvc.increase(id,amount);
		};
		$scope.decrease = AdminSvc.decrease;
		$scope.wordsList = TranslateSvc.wordsList;
	}]);