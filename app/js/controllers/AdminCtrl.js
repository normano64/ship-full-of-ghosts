'use strict';

angular
.module('shipFullOfGhosts.controllers')
.controller('AdminCtrl', [
	'$scope',
	'$http', 
	function($scope, $http) {
		$scope.items = null;
		$http.get('js/drinks.json')
		.then(function(res){
			$scope.items = res.data.payload;
		});
	}]);