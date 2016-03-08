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
  .controller('CartCtrl', ['$scope', 'AccountSvc', function($scope, AccountSvc) {
    $scope.isExpanded = false;
    $scope.expandText = '◀';

    $scope.items = {
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

    $scope.toggleCart = function() {
      $scope.isExpanded = !$scope.isExpanded;
      $scope.expandText = $scope.isExpanded ? '▶' : '◀';
    };

    $scope.increaseItem = function(id) {
      if (typeof $scope.items[id] === 'undefined') {
        console.log('something goes wrong, no changing anything...');
      } else {
        $scope.items[id].quantity ++;
      }
    }

    $scope.decreaseItem = function(id) {
      if (typeof $scope.items[id] === 'undefined') {
        console.log('something goes wrong, no changing anything...');
      } else {
        if (!(-- $scope.items[id].quantity)) {
          // remove it from the cart
          $scope.items[id] = undefined;
        }
      }
    }

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
    .controller('ProductsCtrl', ['$scope', '$http', 'AccountSvc', '$window', '$timeout', function($scope, $http, AccountSvc, $window, $timeout) {
    $scope.user = AccountSvc.getUser();

    $scope.items = null;
    $http.get('js/drinks.json')
        .then(function(res){
            $scope.items = res.data.payload;
        });

    // $timeout adds a new event to the browser event queue 
    // (the rendering engine is already in this queue) so it will complete the execution before the new timeout event.
    $timeout(function() {
      var cartElement = angular.element(document.querySelectorAll('.cart'));
      var initialOffset = parseInt(cartElement.css('margin-top'));

      angular.element(document.querySelectorAll('.products-item')).bind('dragstart', function() {
        console.log('start');
        angular.element(document.querySelectorAll('.products-item')).css('opacity', '0');
        angular.element(this).css('opacity', '1');
        angular.element(document.querySelectorAll('.cart-drop')).css('width', '0px');
        var containerWidth = angular.element(document.querySelectorAll('.product-wrapper')).css('width');
        var calcLeft = parseInt(containerWidth) / 0.8 / 2 + 'px';
        angular.element(document.querySelectorAll('.cart-drop')).css('left', calcLeft);
        angular.element(document.querySelectorAll('.cart-drop')).css('display', 'flex');
      });

      angular.element(document.querySelectorAll('.products-item')).bind('dragend', function() {
        console.log('end');
        angular.element(document.querySelectorAll('.products-item')).css('opacity', '1');
        angular.element(document.querySelectorAll('.cart-drop')).css('display', 'none');
      });

      angular.element(document.querySelectorAll('.cart-drop-icon')).bind('drop', function() {
        console.log('drop');
      });

      angular.element(document.querySelectorAll('.cart-drop-icon')).bind('dragover', function() {
        console.log('over');
        return false;
      });

      angular.element($window).bind("scroll", function() {
        cartElement.css('margin-top', initialOffset + this.pageYOffset + 'px');
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
    }

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
