'use strict';

angular.module('shipFullOfGhosts.controllers', []);
angular.module('shipFullOfGhosts.directives', []);
angular.module('shipFullOfGhosts.services', []);
angular
  .module('shipFullOfGhosts', [
    'ngRoute',
    'ui.bootstrap',
    'shipFullOfGhosts.controllers',
    'shipFullOfGhosts.directives',
    'shipFullOfGhosts.services'
  ])
  .constant('API', 'http://pub.jamaica-inn.net/fpdb/api.php')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl',
        controllerAs: 'products'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('AdminCtrl', ['$scope', function($scope) {
    
  }]);
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('CartCtrl', ['$scope', 'AccountSvc', 'CartSvc', function($scope, AccountSvc, CartSvc) {
    $scope.expandText = '◀';

    $scope.cart = CartSvc.getCart();

    $scope.toggleCart = function() {
      $scope.cart.isExpanded = !$scope.cart.isExpanded;
      $scope.expandText = $scope.cart.isExpanded ? '▶' : '◀';
    };

    $scope.increaseItem = CartSvc.increaseItem;
    $scope.decreaseItem = CartSvc.decreaseItem;
    $scope.redo = CartSvc.redo;
    $scope.undo = CartSvc.undo;

    $scope.user = AccountSvc.getUser();
  }]);
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('HomeCtrl', ['$scope', function($scope) {
    
  }]);
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('NavCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.signOut = function() {
      AccountSvc.signOut();
    };

    $scope.user = AccountSvc.getUser();
  }]);
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('ProductsCtrl', [
      '$scope', 
      '$http', 
      'AccountSvc', 
      '$window', 
      '$timeout', 
      'CartSvc', 
      function($scope, $http, AccountSvc, $window, $timeout, CartSvc) {
        $scope.user = AccountSvc.getUser();

        $scope.canDrop = false;
        $scope.dragging = false;

        $scope.items = null;
        $http.get('js/drinks.json')
          .then(function(res){
              $scope.items = res.data.payload;
          });

        var selectElement = function(identifier) {
          return angular.element(document.querySelectorAll(identifier));
        };

        // $timeout adds a new event to the browser event queue 
        // (the rendering engine is already in this queue) so it will complete the execution before the new timeout event.
        $timeout(function() {
          var cartElement = selectElement('.cart');
          var cartPhantomElement = selectElement('.cart-phantom');
          var productsItemElement = selectElement('.products-item');
          var wrapperElement = selectElement('.product-wrapper');
          var cartDropWrapperElement = selectElement('.cart-drop-wrapper');
          var cartDropIconElement = selectElement('.cart-drop-icon');

          var initialOffset = parseInt(cartElement.css('margin-top'));

          productsItemElement.bind('dragstart', function(ev) {
            ev.originalEvent.dataTransfer.setData('id', angular.element(this).attr('id').slice('products-item-'.length));

            var containerWidth = parseInt(wrapperElement.css('width')) + 2 * parseInt(wrapperElement.css('margin-left'));
            var calcLeft = containerWidth / 2 + 'px';

            $scope.dragging = true;
            $scope.$apply();

            productsItemElement.css('opacity', '0');
            angular.element(this).css('opacity', '1');
            cartDropWrapperElement.css('width', '0px');
            cartDropWrapperElement.css('left', calcLeft);
            cartDropWrapperElement.css('display', 'flex');
          });

          productsItemElement.bind('dragend', function() {
            $scope.canDrop = false;
            $scope.dragging = false;
            $scope.$apply();

            productsItemElement.css('opacity', '1');
            cartDropWrapperElement.css('display', 'none');
          });

          cartDropIconElement.bind('drop', function(ev) {
            var selectedId = ev.originalEvent.dataTransfer.getData('id');
            CartSvc.addItem(selectedId);
          });

          cartDropIconElement.bind('dragover', function() {
            $scope.canDrop = true;
            $scope.$apply();
            return false;
          });

          cartDropIconElement.bind('dragleave', function() {
            $scope.canDrop = false;
            $scope.$apply();
            return false;
          });

          angular.element($window).bind("scroll", function() {
            cartPhantomElement.css('margin-top', initialOffset + this.pageYOffset + 'px');
          });
        }, 0);
      }]);

'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('SigninCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.signIn = function(username, password) {
      AccountSvc.signIn(username, password);
      console.log(username + ' has signed in!');
    };
  }]);
'use strict';

angular
  .module('shipFullOfGhosts.services')
  .service('AccountSvc', ['API', '$location', function(API, $location) {
    var AccountSvc = {};

    AccountSvc.user = {
      isSignedIn: false
    };

    AccountSvc.getUser = function() {
      return AccountSvc.user;
    };

    AccountSvc.signIn = function(username, password) {
      AccountSvc.user.username = username;
      AccountSvc.user.isSignedIn = true;

      $location.path('/products');
    };

    AccountSvc.signOut = function() {
      AccountSvc.user.username = undefined;
      AccountSvc.user.isSignedIn = false;
    }

    return AccountSvc;
  }]);

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
      redoable: false
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
      }
    };

    CartSvc.decreaseItem = function(id) {
      if (typeof CartSvc.cart.items[id] === 'undefined') {
        console.log('something goes wrong, no changing anything...');
      } else {
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
        pushUndo();
        CartSvc.cart.items[id].quantity ++;
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
