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
      .when('/thankyou', {
        templateUrl: 'views/thankyou.html',
        controller: 'ThankYouCtrl',
        controllerAs: 'thankyou'
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

// this script is used for fetching all the beers with their information
/*
var http = function() {
  this.get = function(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() { 
      if (request.readyState == 4 && request.status == 200)
        callback(request.responseText);
      }

      request.open("GET", url, true);
      request.send(null);
  };
}

var client = new http();
client.get('http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get', function(response) {
  var payload = JSON.parse(response).payload;
  let requests = payload.map((item) => {
    return new Promise((resolve) => {
      client.get('http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id=' + item.beer_id, function(detailResponse) {
        var detailPayload = JSON.parse(detailResponse).payload;
        item.detail = detailPayload[0];
        resolve();
      });
    });
  });

  Promise.all(requests).then(() => console.log(JSON.stringify(payload)));
});
*/
'use strict';

angular
.module('shipFullOfGhosts.controllers')
.controller('AdminCtrl', [
	'$scope',
	'$http',
	'AdminSvc',
	'TranslateSvc',
	function($scope, $http, AdminSvc, TranslateSvc) {
		$scope.stock = AdminSvc.getStock();
		$scope.increase = function(id, amount){
			AdminSvc.increase(id,amount);
		};
		$scope.decrease = AdminSvc.decrease;
		$scope.wordsList = TranslateSvc.wordsList;
	}]);
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
  .controller('CartCtrl', ['$scope', 'AccountSvc', 'CartSvc', '$uibModal', function($scope, AccountSvc, CartSvc, $uibModal) {
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

    $scope.checkout = function() {
      var checkoutModal = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'checkout.html',
        controller: 'CheckoutCtrl'
      });
    };

    $scope.$watch('cart', function() {
      $scope.totalPrice = CartSvc.getTotalPrice();
    }, true);
  }]);
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('CheckoutCtrl', ['$scope', '$uibModalInstance', 'CartSvc', '$location', function($scope, $uibModalInstance, CartSvc, $location) {
      $scope.cart = CartSvc.getCart();

      $scope.totalPrice = CartSvc.getTotalPrice();

      $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
      };

      $scope.confirm = function() {
        CartSvc.clear();
        $location.path('/thankyou');
        $uibModalInstance.dismiss('cancel');
      };
    }]);
'use strict';

angular
  .module('shipFullOfGhosts.controllers')
    .controller('DrinksInfoCtrl', [
      '$scope',
      '$http',
      '$uibModalInstance',
      'drinkId',
      'CartSvc',
      function($scope, $http, $uibModalInstance, drinkId, CartSvc) {
        $http.get('js/drinks.json')
          .then(function(res) {
            var allItems = res.data.payload;
            allItems.forEach(function(item) {
              if (item.beer_id === drinkId) {
                $scope.drink = item;
              }
            });
          });

        $scope.close = function() {
          $uibModalInstance.dismiss('cancel');
        };

        $scope.buy = function() {
          CartSvc.addItem(drinkId);
          $uibModalInstance.dismiss('cancel');
        };
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
      '$uibModal',
      'TranslateSvc',
      function($scope, $http, AccountSvc, $window, $timeout, CartSvc, $uibModal, TranslateSvc) {
        $scope.user = AccountSvc.getUser();

        $scope.wordsList = TranslateSvc.wordsList;

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

        $scope.showDrinksInfo = function(id) {
          var drinksInfoModal = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'drinksInfo.html',
            controller: 'DrinksInfoCtrl',
            resolve: {
              drinkId: function () {
                return id;
              }
            }
          });
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
  .module('shipFullOfGhosts.controllers')
  .controller('ThankYouCtrl', ['$scope', 'AccountSvc', '$timeout', '$location', '$interval', function($scope, AccountSvc, $timeout, $location, $interval) {
    $scope.countdown = 5;

    $interval(function() {
      $scope.countdown --;
    }, 1000);

    $scope.user = AccountSvc.getUser();
    if ($scope.user.isSignedIn) {
      $scope.username = ' ' + 'some user I don\'t know';
    }

    $timeout(function() {
      $location.path('/');
    }, 5000);
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
			if(id==AdminSvc.stock.drinks[i].beer_id && AdminSvc.stock.drinks[i].count+num>=0){
				AdminSvc.stock.drinks[i].count =  AdminSvc.stock.drinks[i].count+num;				
			}
		}
	}
}
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
      items: {},
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

    CartSvc.getTotalPrice = function() {
      var totalPrice = 0;
      for (var item in CartSvc.cart.items) {
        totalPrice += parseFloat(CartSvc.cart.items[item].price) * CartSvc.cart.items[item].quantity;
      }

      return totalPrice;
    };

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
      "swedishText": "Logga in"},
      "id_9":{
      "englishText": "Invalid username or password",
      "swedishText": "Ogiltigt använarnamn eller lösenord"},
      "id_10":{
      "englishText": "Low stock of the following products(s)",
      "swedishText": "Få varor i lagret av följande produkt(er)"},
      "id_11":{
      "englishText": "Stock adjustments",
      "swedishText": "Justering av lager"},
      "id_12":{
      "englishText": "Select the beverage you want to adjust",
      "swedishText": "Välj drycken du vill justera"},
      "id_13":{
      "englishText": "Left",
      "swedishText": "Kvar"},
      "id_14":{
      "englishText": "Allergy",
      "swedishText": "Allergi"},
      "id_15":{
      "englishText": "Sort by",
      "swedishText": "Sortera efter"},
      "id_16":{
      "englishText": "Name a-ö",
      "swedishText": "Namn a-ö"},
      "id_17":{
      "englishText": "Price low-high",
      "swedishText": "Pris lågt-högt"},
      "id_18":{
      "englishText": "Price high-low",
      "swedishText": "Pris högt-lågt"},
      "id_19":{
      "englishText": "Search term...",
      "swedishText": "Sök..."},
      "id_20":{
      "englishText": "Redo",
      "swedishText": "Gör om"},
      "id_21":{
      "englishText": "Undo",
      "swedishText": "Ångra"},
      "id_22":{
      "englishText": "Checkout",
      "swedishText": "Betala"},
      "id_23":{
      "englishText": "Alcohol",
      "swedishText": "Alkohol"},
      "id_24":{
      "englishText": "No",
      "swedishText": "Nej"},
      "id_25":{
      "englishText": "Name ö-a",
      "swedishText": "Namn ö-a"},
      "id_26":{
      "englishText": "amount",
      "swedishText": "mängd"}
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