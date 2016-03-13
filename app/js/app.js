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
      var priceNumbers = parseInt(parseFloat(priceString) * 100).toString();
      var formattedPrice = priceNumbers.slice(0, -2) + '.' + priceNumbers.slice(-2);
      return formattedPrice;
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
