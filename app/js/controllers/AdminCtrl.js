'use strict';

angular
.module('shipFullOfGhosts.controllers')
.controller('AdminCtrl', [
	'$scope',
	'$http',
	'AdminSvc',
	function($scope, $http, AdminSvc) {
		$scope.stock = AdminSvc.getStock();
		$scope.increase = function(id, amount){
			AdminSvc.increase(id,amount);
		};
		$scope.decrease = AdminSvc.decrease;
	}]);