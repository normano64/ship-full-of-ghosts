'use strict';

angular
  .module('shipFullOfGhosts.services')
  .service('CartSvc', ['API', function(API) {
    var CartSvc = {};

    CartSvc.cart = {
      0: {
        id: 0,
        name: 'Brooklyn',
        price: 79,
        quantity: 1
      },
      1: {
        id: 1,
        name: 'Chimay blå',
        price: 27.9,
        quantity: 3
      },
      2: {
        id: 2,
        name: 'Thai',
        price: 57,
        quantity: 1
      },
      3: {
        id: 3,
        name: 'Kyckling Med',
        price: 420,
        quantity: 2
      },
      4: {
        id: 4,
        name: 'Thai Broileri',
        price: 10,
        quantity: 1
      }
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
        CartSvc.cart[id] = {
          id: 4,
          name: 'Thai Broileri',
          price: 10,
          quantity: 1
        };
      } else {
        CartSvc.cart[id].quantity ++;
      }
    };

    return CartSvc;
  }]);
