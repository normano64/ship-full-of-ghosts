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
  .filter('price', function() {
    return function(priceString) {
      return priceString.toFixed(2);
    };
  })
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

    $scope.$watch('cart', function() {
      $scope.totalPrice = CartSvc.getTotalPrice();
    }, true);
  }]);
'use strict';

angular
.module('shipFullOfGhosts.controllers')
.controller('HomeCtrl', [
	'$scope',
	'$http',
	'AccountSvc',
	'TranslateSvc',
	function($scope, $http, AccountSvc, TranslateSvc) {
		$scope.wordsList = TranslateSvc.wordsList;
    }]);
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('NavCtrl', ['$scope', 'AccountSvc', 'TranslateSvc', function($scope, AccountSvc, TranslateSvc) {
    $scope.signOut = function() {
      AccountSvc.signOut();
    };

   $scope.translateSwe = function(){
    	TranslateSvc.translateSwe();
    }

    $scope.translateEng = function(){
    	TranslateSvc.translateEng();
    }

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
          $scope.predicate = 'namn';
          $scope.predicateName = 'Name a-ö';
          $scope.order = function(item, predicate, reverse) {
              if(reverse) {
                  predicate = '-' + predicate;
              }
              $scope.predicate = predicate;
              $scope.reverse = reverse;
              $scope.predicateName = item.currentTarget.textContent;
          };
          $scope.allergy = 'No';
          $scope.allergies = {
              'gluten': false,
              'alcohol': false
          };
          $scope.allergyfn = function(allergy) {
              if($scope.allergies[allergy] == false) {
                  $scope.allergies[allergy] = true;
              } else {
                  $scope.allergies[allergy] = false;
              }
              var allergies = ''
              angular.forEach($scope.allergies, function(value, key) {
                  if(value) {
                      if(allergies == '') {
                          allergies = key;
                      } else {
                          allergies = allergies + ', ' + key;
                      }
                  }
              });
              if(allergies == '') {
                  allergies = 'No';
              }
              $scope.allergy = allergies;
          };
          $scope.filterAlcohol = function(item) {
              var keep = true;
              angular.forEach($scope.allergies, function(value, key) {
                  if(value && item.allergy.indexOf(key) > -1) {
                      keep = false;
                  }
              });
              return keep;
          };

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
        }, 100);
      }]);

'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('SigninCtrl', ['$scope', '$timeout', 'AccountSvc', 'TranslateSvc', function($scope, $timeout, AccountSvc, TranslateSvc) {
    $scope.signIn = function(username, password) {
      AccountSvc.signIn(username, password);
      console.log(username + ' has signed in!');
    };
    $scope.wordsList = TranslateSvc.wordsList;

    $scope.showWrong = false;
	$scope.$timeout = $timeout;
	$scope.show = function() {
		$scope.showWrong=true;
	}
  }]);
'use strict';

angular
.module('shipFullOfGhosts.services')
.service('AccountSvc', ['API', '$location', '$http', function(API, $location, $http) {
  var AccountSvc = {};

  AccountSvc.user = {
    users: {

    },
    isSignedIn: false
  };

  $http.get('js/users.json')
  .then(function(res){
    AccountSvc.user.users = res.data.payload;
  });


  AccountSvc.getUser = function() {
    return AccountSvc.user;
  };

  AccountSvc.signIn = function(uname, password) {
    for(var i=0; i<AccountSvc.user.users.length;i++){
      if (uname==password && uname==AccountSvc.user.users[i].username){
        AccountSvc.user.username = AccountSvc.user.users[i].first_name + " " + AccountSvc.user.users[i].last_name;
        AccountSvc.user.isSignedIn = true;
        if(AccountSvc.user.users[i].admin=="yes"){
          $location.path('/admin');
        }
        else if(AccountSvc.user.users[i].admin=="no"){
          $location.path('/products');
        }
      }
    }
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
        pushUndo();
        if (!(-- CartSvc.cart.items[id].quantity)) {
          // remove it from the cart
          CartSvc.cart.items[id] = undefined;
        }
      }
    };

    CartSvc.addItem = function(id) {
      if (typeof id === 'string') {
        id = parseInt(id);
      }

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

    CartSvc.getTotalPrice = function() {
      var totalPrice = 0;
      for (var item in CartSvc.cart.items) {
        totalPrice += parseFloat(CartSvc.cart.items[item].price) * CartSvc.cart.items[item].quantity;
      }

      return totalPrice;
    }

    return CartSvc;
  }]);

'use strict';

angular
  .module('shipFullOfGhosts.services')
  .service('TranslateSvc', ['API', '$http', function(API, $http) {
    var TranslateSvc = {};

    TranslateSvc.wordsList = {
      words:{
     "id_1":{
      "englishText": "Beer",
      "swedishText": "Öl"},
      "id_2":{
      "englishText": "Wine",
      "swedishText": "Vin"},
      "id_3":{
      "englishText": "Whiskey",
      "swedishText": "Whisky"},
      "id_4":{
      "englishText": "Guest",
      "swedishText": "Gäst"},
      "id_5":{    
      "englishText": "Beverages",
      "swedishText": "Drycker"},
      "id_6":{
      "englishText": "Username",
      "swedishText": "Användarnamn"},
      "id_7":{
      "englishText": "Password",
      "swedishText": "Lösenord"},
      "id_8":{
      "englishText": "Login",
      "swedishText": "Logga in"}
      },
      isSwedish:false
    };

    TranslateSvc.getWords = function() {
      return TranslateSvc.wordsList;
    };

    TranslateSvc.translateSwe = function(){
      TranslateSvc.wordsList.isSwedish = true;
    };

    TranslateSvc.translateEng = function(){
      TranslateSvc.wordsList.isSwedish = false;
    }

    return TranslateSvc;
  }]);