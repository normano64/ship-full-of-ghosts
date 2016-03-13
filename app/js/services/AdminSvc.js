'use strict';

angular
.module('shipFullOfGhosts.services')
.service('AdminSvc', ['API', '$http', function(API, $http) {
	var AdminSvc = {};

	AdminSvc.stock = {
		drinks: {

		}
	};

	$http.get('js/drinks.json')
	.then(function(res){
		AdminSvc.stock.drinks = res.data.payload;
	});

	AdminSvc.getStock = function() {
		return AdminSvc.stock;
	};

	function isInteger(x) {
		return (typeof x === 'number') && (x % 1 === 0);
	};

	AdminSvc.increase = function(id,num){
		if(isInteger(num)){
		for(var i = 0; i<AdminSvc.stock.drinks.length;i++){
			if(id==AdminSvc.stock.drinks[i].beer_id){
				AdminSvc.stock.drinks[i].count =  parseInt(AdminSvc.stock.drinks[i].count)+num;				
			}
		}
	}
}
		AdminSvc.decrease = function(id,num){
		if(isInteger(num)){
		for(var i = 0; i<AdminSvc.stock.drinks.length;i++){
			if(id==AdminSvc.stock.drinks[i].beer_id){
				AdminSvc.stock.drinks[i].count =  parseInt(AdminSvc.stock.drinks[i].count)-num;				
			}
		}
	}
}
	return AdminSvc;		
}]);