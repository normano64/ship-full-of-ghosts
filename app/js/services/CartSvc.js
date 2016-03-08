'use strict';

angular
  .module('shipFullOfGhosts.services')
  .service('CartSvc', ['API', '$http', function(API, $http) {
    var CartSvc = {};
    var allItems = {};

    $http.get('js/drinks.json')
      .then(function(res){
          allItems = res.data.payload;
      });

    CartSvc.cart = {
    };

    CartSvc.getCart = function() {
      return CartSvc.cart;
    };

    CartSvc.increaseItem = function(id) {
      if (typeof CartSvc.cart[id] === 'undefined') {
        console.log('something goes wrong, no changing anything...');
      } else {
        CartSvc.cart[id].quantity ++;
      }
    };

    CartSvc.decreaseItem = function(id) {
      if (typeof CartSvc.cart[id] === 'undefined') {
        console.log('something goes wrong, no changing anything...');
      } else {
        if (!(-- CartSvc.cart[id].quantity)) {
          // remove it from the cart
          CartSvc.cart[id] = undefined;
        }
      }
    };

    CartSvc.addItem = function(id) {
      if (typeof CartSvc.cart[id] === 'undefined') {
        var itemFound = false;
        for (var i = 0; i < allItems.length; i ++) {
          var item = allItems[i];
          if (item.beer_id === id) {
            CartSvc.cart[id] = {
              beer_id: id,
              namn: item.namn,
              price: item.pub_price,
              quantity: 1
            };
            itemFound = true;
            break;
          }
        }
        if (!itemFound) {
          console.log('something goes wrong, no changing anything...');
        }
      } else {
        CartSvc.cart[id].quantity ++;
      }
    };

    return CartSvc;
  }]);
