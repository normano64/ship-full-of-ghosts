'use strict';

angular
  .module('shipFullOfGhosts.services')
  .service('CartSvc', ['API', '$http', function(API, $http) {
    var CartSvc = {};
    var allItems = {};
    var undoItemsStack = [];
    var redoItemsStack = [];

    // deep clone helper function
    var clone = function(obj) {
      return JSON.parse(JSON.stringify(obj));
    };

    // grasp a copy of information of all drinks 
    $http.get('js/drinks.json')
      .then(function(res){
          allItems = res.data.payload;
      });

    // the main object representing cart, which the other component might interact with
    CartSvc.cart = {
      items: {},
      isExpanded: false,
      undoable: false,
      redoable: false
    };

    var pushUndo = function() {
      undoItemsStack.push(clone(CartSvc.cart.items));
      // we only allow up to 5 undo steps here
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
        // push the current state into the undo stack
        pushUndo();
        CartSvc.cart.items[id].quantity ++;
      }
    };

    CartSvc.decreaseItem = function(id) {
      if (typeof CartSvc.cart.items[id] === 'undefined') {
        console.log('something goes wrong, no changing anything...');
      } else {
        // push the current state into the undo stack
        pushUndo();
        if (!(-- CartSvc.cart.items[id].quantity)) {
          // remove it from the cart
          CartSvc.cart.items[id] = undefined;
        }
      }
    };

    CartSvc.addItem = function(id) {
      if (typeof id === 'string') {
        // convert the id to integer
        id = parseInt(id);
      }

      if (typeof CartSvc.cart.items[id] === 'undefined') {
        // this is a new item to be added
        var itemFound = false;
        for (var i = 0; i < allItems.length; i ++) {
          var item = allItems[i];
          if (item.beer_id === id) {
            // push the current state into the undo stack
            pushUndo();

            // create new item in the cart
            CartSvc.cart.items[id] = {
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
        // this is increasing the quantity of exsting product
        // push the current state into the undo stack
        pushUndo();
        CartSvc.cart.items[id].quantity ++;
      }

      CartSvc.cart.isExpanded = true;
    };

    CartSvc.undo = function() {
      if (undoItemsStack.length > 0) {
        // checking if it's undoable currently
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
        // checking if it's redoable currently
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

    // method for calculating the total price for current cart
    CartSvc.getTotalPrice = function() {
      var totalPrice = 0;
      for (var item in CartSvc.cart.items) {
        totalPrice += parseFloat(CartSvc.cart.items[item].price) * CartSvc.cart.items[item].quantity;
      }

      return totalPrice;
    };

    // clear the cart, which is usually called after checkout
    CartSvc.clear = function() {
      CartSvc.cart = {
        items: {},
        isExpanded: false,
        undoable: false,
        redoable: false
      };
    }

    return CartSvc;
  }]);
