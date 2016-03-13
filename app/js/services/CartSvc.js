'use strict';

angular
  .module('shipFullOfGhosts.services')
  .service('CartSvc', ['API', '$http', function(API, $http) {
    var CartSvc = {};
    var allItems = {};
    var undoItemsStack = [];
    var redoItemsStack = [];

    var clone = function(obj) {
      return JSON.parse(JSON.stringify(obj));
    };

    $http.get('js/drinks.json')
      .then(function(res){
          allItems = res.data.payload;
      });

    CartSvc.cart = {
      items: {

      },
      isExpanded: false,
      undoable: false,
      redoable: false,
      totalPrice: 0
    };

    var pushUndo = function() {
      undoItemsStack.push(clone(CartSvc.cart.items));
      undoItemsStack = undoItemsStack.slice(-5);
      redoItemsStack = [];
      CartSvc.cart.undoable = true;
      CartSvc.cart.redoable = false;
    };

    CartSvc.getCart = function() {
      return CartSvc.cart;
    };

    CartSvc.increaseItem = function(id) {
      if (typeof CartSvc.cart.items[id] === 'undefined') {
        console.log('something goes wrong, no changing anything...');
      } else {
        pushUndo();
        CartSvc.cart.items[id].quantity ++;
        CartSvc.cart.totalPrice += parseFloat(CartSvc.cart.items[id].price);
      }
    };

    CartSvc.decreaseItem = function(id) {
      if (typeof CartSvc.cart.items[id] === 'undefined') {
        console.log('something goes wrong, no changing anything...');
      } else {
        CartSvc.cart.totalPrice -= parseFloat(CartSvc.cart.items[id].price);
        if (!(-- CartSvc.cart.items[id].quantity)) {
          // remove it from the cart
          pushUndo();
          CartSvc.cart.items[id] = undefined;
        }
      }
    };

    CartSvc.addItem = function(id) {
      if (typeof CartSvc.cart.items[id] === 'undefined') {
        var itemFound = false;
        for (var i = 0; i < allItems.length; i ++) {
          var item = allItems[i];
          if (item.beer_id === id) {
            pushUndo();

            CartSvc.cart.items[id] = {
              beer_id: id,
              namn: item.namn,
              price: item.sbl_price,
              quantity: 1
            };
            CartSvc.cart.totalPrice += parseFloat(CartSvc.cart.items[id].price);
            itemFound = true;
            break;
          }
        }
        if (!itemFound) {
          console.log('something goes wrong, no changing anything...');
        }
      } else {
        pushUndo();
        CartSvc.cart.items[id].quantity ++;
        CartSvc.cart.totalPrice += parseFloat(CartSvc.cart.items[id].price);
      }

      CartSvc.cart.isExpanded = true;
    };

    CartSvc.undo = function() {
      if (undoItemsStack.length > 0) {
        redoItemsStack.push(clone(CartSvc.cart.items));
        redoItemsStack = redoItemsStack.slice(-5);
        CartSvc.cart.items = undoItemsStack.pop();
        CartSvc.cart.redoable = true;
        if (undoItemsStack.length === 0) {
          CartSvc.cart.undoable = false;
        }
      } else {
        console.log('something goes wrong, no changing anything...');
      }
    };

    CartSvc.redo = function() {
      if (redoItemsStack.length > 0) {
        undoItemsStack.push(clone(CartSvc.cart.items));
        undoItemsStack = undoItemsStack.slice(-5);
        CartSvc.cart.items = redoItemsStack.pop();
        CartSvc.cart.undoable = true;
        if (redoItemsStack.length === 0) {
          CartSvc.cart.redoable = false;
        }
      } else {
        console.log('something goes wrong, no changing anything...');
      }
    };

    return CartSvc;
  }]);
