'use strict';

angular
.module('shipFullOfGhosts.services')
.service('AdminSvc', ['API', '$http', function(API, $http) {
	var AdminSvc = {};
/**
* Object which contains all the drinks.
*/
	AdminSvc.stock = {
		drinks: {

		}
	};
/**
* Populates the list of drinks from the information of the API.
*/
	$http.get('js/drinks.json')
	.then(function(res){
		AdminSvc.stock.drinks = res.data.payload;
	});

/**
* Returns the object
*/

	AdminSvc.getStock = function() {
		return AdminSvc.stock;
	};
/**
* Checks if input is an integer, returns true if it is otherwise false.
*/
	function isInteger(x) {
		return (typeof x === 'number') && (x % 1 === 0);
	};
/**
* Increases the amount of drinks identified by id with amount num. If the stock will be less than zero after update, the update will not go through.
*/
	AdminSvc.increase = function(id,num){
		if(isInteger(num)){
		for(var i = 0; i<AdminSvc.stock.drinks.length;i++){
			if(id==AdminSvc.stock.drinks[i].beer_id && AdminSvc.stock.drinks[i].count+num>=0){
				AdminSvc.stock.drinks[i].count =  AdminSvc.stock.drinks[i].count+num;				
			}
		}
	}
}

/**
* Decreases the amount of drinks identified by id with amount num. If the stock will be less than zero after update, the update will not go through.
*/

		AdminSvc.decrease = function(id,num){
		if(isInteger(num)){
		for(var i = 0; i<AdminSvc.stock.drinks.length;i++){
			if(id==AdminSvc.stock.drinks[i].beer_id && AdminSvc.stock.drinks[i].count-num>=0){
				AdminSvc.stock.drinks[i].count =  AdminSvc.stock.drinks[i].count-num;				
			}
		}
	}
}
	return AdminSvc;		
}]);