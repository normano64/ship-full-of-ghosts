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
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);