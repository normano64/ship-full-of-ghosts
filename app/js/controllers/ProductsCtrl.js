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
        angular.element(document.querySelectorAll('.cart-drop')).css('width', angular.element(document.querySelectorAll('.product-wrapper')).css('width'));
        angular.element(document.querySelectorAll('.cart-drop')).css('display', 'flex');
      });

      angular.element(document.querySelectorAll('.products-item')).bind('dragend', function() {
        console.log('end');
        angular.element(document.querySelectorAll('.products-item')).css('opacity', '1');
        angular.element(document.querySelectorAll('.cart-drop')).css('display', 'none');
      });

      angular.element($window).bind("scroll", function() {
        cartElement.css('margin-top', initialOffset + this.pageYOffset + 'px');
      });
    }, 0);
  }]);
